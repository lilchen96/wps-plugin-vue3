import fs from 'fs';
import path from 'path';
import cp from 'child_process';
import inquirer from 'inquirer';

function deleteAll(filePath) {
  fs.readdirSync(filePath).forEach((child) => {
    const childPath = path.resolve(filePath, child);
    if (fs.lstatSync(childPath).isFile()) {
      fs.unlinkSync(childPath);
    } else if (fs.lstatSync(childPath).isDirectory()) {
      deleteAll(childPath);
      fs.rmdirSync(childPath);
    }
  });
}

function deletePublishDir(path) {
  deleteAll(path);
  fs.rmdirSync(path);
}

async function handle() {
  const { url: serverUrl } = await inquirer.prompt([
    {
      type: 'input',
      name: 'url',
      message: '请输入发布 WPS 加载项的服务器地址：',
      validate: function (input) {
        const reg = /.*\/$/;
        if (reg.test(input)) {
          return true;
        } else {
          return `输入服务器地址必须已'/'结束，并确保 输入地址/ribbon.xml是一个有效地址`;
        }
      }
    }
  ]);

  const buildDirPath = path.resolve(process.cwd(), 'wps-addon-build');
  const publishDirPath = path.resolve(process.cwd(), 'wps-addon-publish');
  const jspluginsDirPath = path.resolve(process.cwd(), 'wps-addon-jsplugins');
  if (fs.existsSync(buildDirPath)) {
    deletePublishDir(buildDirPath);
  }
  if (fs.existsSync(publishDirPath)) {
    deletePublishDir(publishDirPath);
  }
  if (fs.existsSync(jspluginsDirPath)) {
    deletePublishDir(jspluginsDirPath);
  }

  // 默认交互答案回填
  const publishCPQAList = [
    {
      question: '请输入发布 WPS 加载项的服务器地址',
      answer: serverUrl
    },
    {
      question: '选择 WPS 加载项发布类型',
      answer: '1' // 在线模式
    },
    {
      question: '您的publish页面是否需要满足多用户同时使用',
      answer: '2' // 是
    }
  ];
  // 生成publish模式的文件
  // 执行 wpsjs publish
  console.log('执行', 'wpsjs publish');
  const publishCP = cp.spawn(process.platform === 'win32' ? 'wpsjs.cmd' : 'wpsjs', ['publish'], {
    stdio: ['pipe', 'pipe', 'inherit']
  });

  publishCP.stdout.on('data', (data) => {
    const output = data.toString();
    process.stdout.write(output);
    if (output.includes('?')) {
      const index = publishCPQAList.findIndex((QA) => output.includes(QA.question));
      if (publishCPQAList[index] && !publishCPQAList[index].isWrite) {
        const answer = publishCPQAList[index].answer;
        publishCP.stdin.write(answer + '\n');
        publishCPQAList[index].isWrite = true;
      }
    }
  });

  publishCP.on('error', (err) => {
    console.error(err);
  });
  publishCP.on('close', () => {
    // 生成jsplugins模式的文件
    fs.mkdirSync(jspluginsDirPath);
    const packageJson = JSON.parse(
      fs.readFileSync(path.resolve(process.cwd(), 'package.json')).toString()
    );
    fs.writeFileSync(
      path.resolve(jspluginsDirPath, 'jsplugins.xml'),
      `
    <jsplugins>
      <jspluginonline name="${packageJson.name}" type="wps" url="${serverUrl}"/>
    </jsplugins>`
    );
  });
}

handle();
