# Writing a plugin

For our smtp-server, we've created a special plugin system. We are writing the plugins in typescript, and then compiling it into an haraka compatible plugin for our smtp-server. This means, before every run of the smtp-server, you'll have to run this plugin.