
export const config = {
    mode: process.env.CLIENT_MODE,

    local_server_url: 'http://0.0.0.0:10007',
    vm_server_url: 'https://u.memoricci.fun',

}

let default_server_url = config.local_server_url;
let default_client_url = config.local_server_url;

if (config.mode == 'production') {
    default_server_url = config.vm_server_url;
    default_client_url = config.vm_server_url;
}

export const server_url = default_server_url;
export const client_url = default_server_url;