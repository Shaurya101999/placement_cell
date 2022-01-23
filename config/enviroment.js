const development = {
    name: 'development',
    asset_path: './assets',
    session_cookie_key: 'HelloPlacementHelloCell',
    db: 'placement_cell_development'

}
const production = {
    name: 'production',
    asset_path: process.env.PLACEMENT_ASSET_PATH,
    session_cookie_key: process.env.PLACEMENT_CELL_SESSION_COOKIE_KEY,
    db:  process.env.MONGODB_URI,
    // db:  process.env.PLACEMENT_DB

}
console.log(eval(process.env.PLACEMENT_ENVIROMENT)+' '+process.env.PLACEMENT_CELL_SESSION_COOKIE_KEY);

module.exports = eval(process.env.PLACEMENT_ENVIROMENT) == undefined ? development : eval(process.env.PLACEMENT_ENVIROMENT);