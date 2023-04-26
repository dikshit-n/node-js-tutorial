// when a package is installed
   // its version information is stored in the package.json file of our app
   // its dependencies are also installed
        // those dependencies are installed under the root node_modules folder instead of the package's folder
        // but when the package is dependent on a different version of an already installed package,
            // the version which the package depends on is installed inside the node_modules folder of the package instead of the root node_modules folder
                
                ├── request@2.12.0
                └─┬ some-other-library@1.2.3
                    └── request@1.9.9

// Sematic versioning
// https://false-roadrunner-986.notion.site/Definitions-7e832a9c4633442da4cb928b7bb4fc93#0d49c8b29d8441a5adeb936b0edcffee

// check the dependencies
// npm list -> lists all the dependencies of the applications and the dependencies the application dependencies
// npm list -- depth=0 -> lists all the dependencies of the application