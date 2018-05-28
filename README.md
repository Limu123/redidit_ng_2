
## Redidit

### Installation
```bash
$ git clone this repo
$ cd redidit_ng_2/
$ (sudo) npm install
$ bower install
```

### Build
```bash
$ grunt build
```

### Run
```bash
$ grunt serve
```

### Test
```bash
$ grunt test
```

### Deploy
```bash
$ firebase deploy
```

### Live Preview
https://redidit.firebaseapp.com/#/


## Remarks

### known issues
isotope sometimes renders the posts with overlapping tiles. A page reload fixes the problem.
(no fixes are included to let external components do what they are supposed to do)

### unit test
Units tests are included for the main view. The goal was to include the unit testing in the
grunt automation with karma, jasmine and different browsers.
Available are phantomJS, chrome and firefox.
phantomJS is the default test browser. Edit karma.conf.js to use one of the others or all together.

### testing-db
a testing database is available (redidit-test.firebaseapp.com) for integration tests

### open tasks (in case someone of the project team is in the mood to continue :)
- include feedback from user testings
- add additional tests for all js-scripts
- add test code coverage
- add integration tests
- fix isotope behavior
- include error handling for the case of a disconnection from firebase
- add offline support
- edit user data
- edit post data (only if no votes/comments are available)
