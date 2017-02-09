module.exports = {
  servers: {
    one: {
      host: '45.79.133.13',
      username: 'gadareth',
      //password: 'gradpi'
      pem: './.config/gradpi'
      // or leave blank for authenticate from ssh-agent
    }
  },

  meteor: {
    name: 'gradpi',
    path: '.',
    servers: {
      one: {}
    },
    buildOptions: {
      serverOnly: true,
    },
    env: {
      ROOT_URL: 'http://gradpi.com',
      MONGO_URL: 'mongodb://localhost/meteor'
    },

    //dockerImage: 'kadirahq/meteord'
    dockerImage: 'abernix/meteord:base',
    deployCheckWaitTime: 120
  },

  mongo: {
    oplog: true,
    port: 27017,
    servers: {
      one: {},
    },
  },
};