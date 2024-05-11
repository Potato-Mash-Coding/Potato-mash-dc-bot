module.exports = {
    name: 'ready',
    once: true,
    async execute(client){
        setTimeout(() => {
            console.log(`就緒, 機器人ID ${client.user.tag} 已經上線!`);
        }, 1000);
    }
}
