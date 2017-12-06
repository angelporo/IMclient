/**
 * 用户配置信息
 **/

const config = {
    'pro': {
      server: 'http://127.0.0.1:7078',
      domain: "http://localhost:8080",
      chat: "users",
      chatgroups:"chatgroups",
    },
    'dev': {
      server: 'http://im-server.plusman.cn',
      domain: "http://localhost:8080",
      chat: "users",
      chatgroups:"chatgroups",
    }
};

export default config.dev;
