module.exports = {
    name: 'ready',
    once: true,
    async execute(client){
        console.log(`就緒, 機器人ID ${client.user.tag} 已經上線!`);
    }
}