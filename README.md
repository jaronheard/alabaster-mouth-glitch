# CIVIC starter kit
This app is set up to provide you with a web application that uses the component library for [CIVIC](www.civicplatform.org).

**Resources**
- [Our component storybook](https://hackoregon.github.io/civic/)
- [The code behind our storybook](https://github.com/hackoregon/civic/tree/master/packages/component-library/stories)
- [Our front-end GitHub repo](https://github.com/hackoregon/civic)
- [Our back-end GitHub examplar repo](https://github.com/hackoregon/civic)
- [Civic Software Foundation](https://www.civicsoftwarefoundation.com)
- [Civic APIs](https://service.civicpdx.org/)
- [Civic volunteer form](http://www.hackoregon.org/joinacivicteam)

# CIVIC technical information

This project is set up and ready to go with React, webpack, and Babel. It will take care of fun stuff like supporting the latest and greatest ECMAScript features, compiling your JSX to JavaScript, and more.

## Getting Off the Ground

The root of the project is in `client/App.js`. You can require other files from here. webpack will rebuild your project using HMR whenever you make a change. So, there is no need to refresh.

Note that adding additional dependencies in `package.json` or editing `server.js` will restart the container and will take a while. 