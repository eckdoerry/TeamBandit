![TeamBandit Logo](/website/src/Images/teamBanditLogo.png)

![](https://img.shields.io/github/contributors/QJMTech/TeamBandit?style=for-the-badge) ![](https://img.shields.io/github/stars/QJMTech/TeamBandit?style=for-the-badge) ![](https://img.shields.io/github/forks/QJMTech/TeamBandit?color=orange&style=for-the-badge) ![](https://img.shields.io/badge/Stage-Beta%20Development-red?style=for-the-badge) ![](https://img.shields.io/github/issues/QJMTech/TeamBandit?style=for-the-badge)

A revolutionary course management portal which combines every element of communication, administration, delegation, and organization to provide a seamless platform for teaching professional skills in the environment most practical to the modern workforce— in a team.

This web-based application serves as an educational turning point from the inadequacy of modern University-level industry preparation. Collaboration has become a cornerstone of every professional field: technology, administration, healthcare, business, engineering, and every branching variation.

# The Motive

Gone are the days in which individuals being bombarded with tasks of short-term memorization and regurgitation would be considered an investment into their professional value. Productive society has recognized and embraced the strength brought about by complementary action among skilled, coordinated colleagues. It is indisputable that effective teamwork serves as an imperative pillar of reaching any worthwhile goal in the face of today's competitive markets that never sleep. Team experience and skills are the single most widely sought after traits for candidates of employment.

Why then, do the overwhelming majority of higher education programs center their curriculums around mind-numbing lectures and individual recollection of unapplied facts? The unfortunate reality is that courses focused on taking knowledge and applying it realistically involves an exhausting amount of organization and management. It involves communication among many parties of varying roles, keeping track of individual progress within a collective within the whole, and trying to maintain consistency across the board. This immense overhead has made it impractical to educate pragmatically— until now.

# The Vision

TeamBandit: an online application designed specifically to automate and organize on behalf of instructors intending to prepare their students for the world they are entering. All of the tedious overhead is taken care of.

***Organization***, with an integrated email forwarding system;  
***Control***, with distinctly-priveleged account types and administrative flexibility;  
***Simplicity***, with drag-and-drop data implementation;  
***Focus***, with full separation of courses; and  
***Assessment***, with automatically-generated websites for showcasing student teams' growth and achievements.

Every tool is neatly combined into a single application, providing the ultimate all-in-one control panel for course organizers to make education reflect reality.

# The Stack

<p float = 'left'>
  <a href="https://www.postgresql.org/">
    <img src="https://www.postgresql.org/media/img/about/press/elephant.png" alt="PostgreSQL Elephant Logo" width="100"/>
  </a>
  &nbsp
  &nbsp
  &nbsp
  <a href="https://expressjs.com/">
    <img src="https://cdn.icon-icons.com/icons2/2699/PNG/512/expressjs_logo_icon_169185.png" alt="ExpressJS Logo" width="100"/>
  </a>
  &nbsp
  &nbsp
  &nbsp
  <a href="https://reactjs.org/">
    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/440px-React-icon.svg.png" alt="ReactJS Logo" width="100"/>
  </a>
  &nbsp
  &nbsp
  &nbsp
  <a href="https://nodejs.org/en/about/">
    <img src="https://nodejs.org/static/images/logos/nodejs-new-pantone-black.svg" alt="NodeJS Logo" width="150"/>
  </a>
</p>

<h3>
  
  <a href="https://www.postgresql.org/">
    PostgreSQL
  </a>
  &nbsp&nbsp&nbsp&nbsp&nbsp
  <a href="https://expressjs.com/">
    Express
  </a>
  &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
  <a href="https://reactjs.org/">
    ReactJS
  </a>
  &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
  <a href="https://nodejs.org/en/about/">
    NodeJS
  </a>
  
</h3>

<br />

# Installation

Hello! You've started upon a journey of getting this app to work, this is here to help you out! Firstly, you want to get this repository on your local machine.
This can be through forking it and cloning your forked repository or through cloning this repo directly. There are tutorials and guides on how to do so :-).

<br/>

Once the application is downloaded you want to make sure you have Node installed on your machine. This is what we use to run React and Express. This can be done here:

<br/>
https://nodejs.org/en/
<br/>
 
 You may need to restart once its done. Navigate to a command line and make sure its installed by typing:

```bash
node -v
```

With that installed you want to navigate to the cloned repository. Specifically you want to be in the /website directory. Once inside you want to run: 

```bash
npm i
```

This should go through and install all of our node dependencies! Congrats, you're progressing along!
<br/>
Next you want to make sure your database is up to date. Inside /website/server we have included a nifty sqlCode.txt for your use! We use PostgreSQL for our
database management system. There are tutorials on how to install this on YouTube. Once installed you should be able to copy the contents of the sqlCode.txt
into a query and run them. This will set up your database to work with our application!
<br/>
Finally, the last thing you need to set up is the .env files. For security reasons we do not include our actual .env files. Instead we have included two .env.examples
located in /website/server and in /website. Each one has some comments and examples of what needs to go there. These basically help set up the connections to the database.
<br/>
Once those are set up you should be good to run the application!

## Windows Run Guide
To run on windows you need to open two terminals, either through VSCodes terminal, powershell, or normal CMD terminal.

<br/>

### First Terminal
Navigate to /website, then run:

```bash
npm run start-client
```

This runs our the React application on localhost.

### Second Terminal
Windows does not execute commands simultaneously. So you need to navigate to, /website/server/middleware and run:

```bash
node authRoutes
```

This sets up the connection to the database.

## Mac Run Guide
For MAC its easy! Navigate to /website and run:

```bash
npm run start-client
```

You should be good to go as MAC will execute both processes!

## Linux Run Guide
*Should be similar to the Mac run process*

<br/>

Hopefully at this point the application is running and you can start working on it! Good luck and have fun!

<br/>
# The Developers

<br />
<br />

<img src="https://avatars.githubusercontent.com/u/77873536?v=4" alt="Photo of Quinn Melssen" width="175"/>

### Quinn Melssen - Team Lead
Quinn is the leader of the project team, defining the objectives of each milestone and ensuring the development process goes according to plan and remains
on schedule.

<br />
<br />
<br />

<img src="https://avatars.githubusercontent.com/u/77859884?v=4" alt="Photo of Dakota Battle" width="175"/>

### Dakota Battle - System Architect
Battle is the system architect, closely monitoring each step of the development process to certify that implementation keeps in accordance with the architectural 
and design structure plans.

<br />
<br />
<br />

<img src="https://avatars.githubusercontent.com/u/80225763?v=4" alt="Photo of Max Mosier" width="175"/>

### Max Mosier - Database Specialist
Max serves as the team's database specialist, organizing and optimizing interactions between the application and the information stored by it.

<br />
<br />
<br />

<img src="https://avatars.githubusercontent.com/u/49794159?v=4" alt="Photo of Liam Scholl" width="175"/>

### Liam Scholl - Release Manager
As release manager, Liam is responsible for the quality assurance of TeamBandit. A detail-oriented professional, he oversees the control of the application
quality and manages both the large and small-scale elements of criteria for each version release to provide the highest standard of product.
