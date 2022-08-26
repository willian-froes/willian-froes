<style>
    @font-face { 
        font-family: RobotoRegular;
        src: url(src/font/roboto-regular.woff);
    }

    @font-face { 
        font-family: RobotoBold;
        src: url(src/font/roboto-bold.woff);
    }

    .line {
        margin-top: 20px;
        margin-bottom: 20px;
    }

    .profile-title {
        font-family: RobotoBold;
        font-size: 22px;
        text-align: center;
    }

    .activities-section {
        display: flex;
        flex-direction: column;
    }

    .activities-phrase {
        font-family: RobotoBold;
        font-size: 14px;
        text-align: center;
        margin-bottom: 20px;
    }

    .activities-items-article {
        display: flex;
        flex: row;
        justify-content: space-between;
        align-items: center;
    }

    .activities-list {
        display: flex;
        flex-direction: column;
        grid-template-columns: auto auto auto;
        gap: 10px;
    }

    .activities-list-item {
        font-family: RobotoRegular;
        font-size: 14px;
    }

    .activities-gif {
        height: 188px;
        width: 188px;
    }

    .lang-tools-section-title, .metrics-section-title {
        font-family: RobotoBold;
        font-size: 18px;
        margin-bottom: 10px;
    }

    .lang-tool-item {
        height: 59px;
        width: 59px;
    }

    .lang-tools-list-between {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .lang-tools-list-evenly {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
    }

    .lang-tools-lists-container {
        display: flex;
        flex-direction: column;
        gap: 30px;
        margin-top: 30px;
        margin-bottom: 30px;
    }

    .metrics-container {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-start;
        margin-top: 30px;
    }
</style>

<h1 style='font-size: 100px; text-align: center;'>TESTE</h1>
<h1 class="profile-title">Olá 👋, me chamo Willian Froes</h1>

<div class="activities-section">
    <h3 class="activities-phrase">Desenvolvo software do protótipo ao produto, veja aqui alguns cases!</h3>
    <div class="activities-items-article">
        <div class="activities-list">
            <h5 class="activities-list-item">🔭 Desenvolvedor Full Stack Pleno na Liven</h5>
            <h5 class="activities-list-item">📕 Pós-graduando em Eng. mobile e Design UX/UI</h5>
            <h5 class="activities-list-item">🏅 PCEP - Certified Entry-Level Python Programmer</h5>
            <h5 class="activities-list-item">🏅 HCIA Cloud Service Associate</h5>
            <h5 class="activities-list-item">🕹️ Nas horas vagas, jogo games retrô e coleciono bonecos</h5>
        </div>
        <img class="activities-gif" src='src/img/profile.gif' />
    </div>
</div>
<hr class="line" />
<div class="lang-tools-section">
    <h2 class="lang-tools-section-title">Linguagens e ferramentas no meu dia a dia</h2>
    <span>No meu dia a dia de trabalho e, em projetos pessoais, há algumas tecnologias que trabalho ativamente, são elas:</span>
    <div class="lang-tools-lists-container">
        <div class="lang-tools-list-between"> 
            <img class="lang-tool-item" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/figma/figma-original.svg" />
            <img class="lang-tool-item" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg" />
            <img class="lang-tool-item" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original.svg" />
            <img class="lang-tool-item" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" />
            <img class="lang-tool-item" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" />
            <img class="lang-tool-item" src="https://seeklogo.com/images/R/react-native-logo-221C671C70-seeklogo.com.png" />
            <img class="lang-tool-item" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg" />
        </div>
        <div class="lang-tools-list-evenly"> 
            <img class="lang-tool-item" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/jest/jest-plain.svg" />
            <img class="lang-tool-item" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg" />
            <img class="lang-tool-item" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/flask/flask-original.svg" />
            <img class="lang-tool-item" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg" />
            <img class="lang-tool-item" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original.svg" />
            <img class="lang-tool-item" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original.svg" />
        </div>
    </div>
</div>
<hr class="line" />
<div class="metrics-section">
    <h2 class="metrics-section-title">Veja aqui algumas métricas do meu perfíl</h2>
    <span>Observe quantos commits, PRs e outros dados foram contabilizados em todos meus repositórios, também visualize as linguagens utilizadas.</span>
    <div class="metrics-container">
        <img width='60%' src="https://github-readme-stats.vercel.app/api?username=willian-froes&show_icons=true&count_private=true&hide_border=false&locale=pt-br&border_color=6F6E76&title_color=B63339&icon_color=B63339&text_color=c9d1d9&bg_color=00000000" /> 
        <img width='38%' src="https://github-readme-stats.vercel.app/api/top-langs/?username=willian-froes&layout=compact&hide_border=false&locale=pt-br&border_color=6F6E76&title_color=B63339&text_color=B63339&bg_color=00000000" />
    </div>
</div>



<!-- <h1 align="center">Hi 👋, I'm Willian Froes</h1>
<h3 align="center">I'm drink coffe while work into full stack development and design products!</h3>

<p align="left"> <img src="https://komarev.com/ghpvc/?username=willian-froes&label=Profile%20views&color=0e75b6&style=flat" alt="willian-froes" /> </p>

<p align="left"> <a href="https://github.com/ryo-ma/github-profile-trophy"><img src="https://github-profile-trophy.vercel.app/?username=willian-froes" alt="willian-froes" /></a> </p>

<h3 align="left">Connect with me:</h3>
<p align="left">
<a href="https://linkedin.com/in/willian-froes" target="blank"><img align="center" src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/linked-in-alt.svg" alt="willian-froes" height="30" width="40" /></a>
<a href="https://instagram.com/willian.froes" target="blank"><img align="center" src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/instagram.svg" alt="willian.froes" height="30" width="40" /></a>
</p>

<h3 align="left">Languages and Tools:</h3>
<p align="left"> <a href="https://getbootstrap.com" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/bootstrap/bootstrap-plain-wordmark.svg" alt="bootstrap" width="40" height="40"/> </a> <a href="https://www.w3schools.com/css/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg" alt="css3" width="40" height="40"/> </a> <a href="https://www.cypress.io" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/simple-icons/simple-icons/6e46ec1fc23b60c8fd0d2f2ff46db82e16dbd75f/icons/cypress.svg" alt="cypress" width="40" height="40"/> </a> <a href="https://www.figma.com/" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/figma/figma-icon.svg" alt="figma" width="40" height="40"/> </a> <a href="https://flask.palletsprojects.com/" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/pocoo_flask/pocoo_flask-icon.svg" alt="flask" width="40" height="40"/> </a> <a href="https://cloud.google.com" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/google_cloud/google_cloud-icon.svg" alt="gcp" width="40" height="40"/> </a> <a href="https://git-scm.com/" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg" alt="git" width="40" height="40"/> </a> <a href="https://heroku.com" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/heroku/heroku-icon.svg" alt="heroku" width="40" height="40"/> </a> <a href="https://www.w3.org/html/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg" alt="html5" width="40" height="40"/> </a> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="40" height="40"/> </a> <a href="https://jestjs.io" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/jestjsio/jestjsio-icon.svg" alt="jest" width="40" height="40"/> </a> <a href="https://www.mongodb.com/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original-wordmark.svg" alt="mongodb" width="40" height="40"/> </a> <a href="https://www.mysql.com/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original-wordmark.svg" alt="mysql" width="40" height="40"/> </a> <a href="https://opencv.org/" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/opencv/opencv-icon.svg" alt="opencv" width="40" height="40"/> </a> <a href="https://www.photoshop.com/en" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/photoshop/photoshop-line.svg" alt="photoshop" width="40" height="40"/> </a> <a href="https://www.postgresql.org" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original-wordmark.svg" alt="postgresql" width="40" height="40"/> </a> <a href="https://www.python.org" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg" alt="python" width="40" height="40"/> </a> <a href="https://reactjs.org/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" alt="react" width="40" height="40"/> </a> <a href="https://reactnative.dev/" target="_blank" rel="noreferrer"> <img src="https://reactnative.dev/img/header_logo.svg" alt="reactnative" width="40" height="40"/> </a> <a href="https://www.typescriptlang.org/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" alt="typescript" width="40" height="40"/> </a> <a href="https://unity.com/" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/unity3d/unity3d-icon.svg" alt="unity" width="40" height="40"/> </a> </p>

<h3 align="left">Support:</h3>
<p><a href="https://www.buymeacoffee.com/willianfroes"> <img align="left" src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" height="50" width="210" alt="willianfroes" /></a></p><br><br>

<p><img align="left" src="https://github-readme-stats.vercel.app/api/top-langs?username=willian-froes&show_icons=true&locale=en&layout=compact" alt="willian-froes" /></p>

<p>&nbsp;<img align="center" src="https://github-readme-stats.vercel.app/api?username=willian-froes&show_icons=true&locale=en" alt="willian-froes" /></p>

<p><img align="center" src="https://github-readme-streak-stats.herokuapp.com/?user=willian-froes&" alt="willian-froes" /></p> -->
