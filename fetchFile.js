
import { create as ipfsClient } from "ipfs-http-client";

async function main() {

 

    const client = ipfsClient({ port: 5002 });
    const cid = 'Qme66r7YoQZBzSzanGZ2mjtgki6F9aKhZ2WJctszGaAYg3/myfile.txt'

     for await (const buff of client.get(cid)) {
  // do something with buf

 // console.log(buff.toString())
}



  
process.exit()

}

main();