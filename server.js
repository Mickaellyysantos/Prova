import { v4 as uuidv4 } from 'uuid';
import { createServer } from 'node:http';
import fs from "node:fs";

import LibraryCentral from "./LibraryCentral.js"

const PORT = 3333;

const server = createServer((request, response)=>{
    const {url, method} = request;

});

if(method === 'POST' && url.startsWith('/livros/')){
    LibraryCentral((err, livro)=>{
        if(err){
            response.writeHead(500, {"Content-Type": "application/json"})
            response.end(JSON.stringify({message: "Erro ao ler os dados"}))
            return
        }
        //imprimir o resultado
        response.writeHead(200, {"Content-Type": "application/json"})
        response.end(JSON.stringify(livro))
    })
}else if(method === 'POST' && url.startsWith('/autores/'))
    let body = ""
    request.on("data",(chuck)=>{
        body += chuck;
    })
    request.on('end',) ()=>{
       const LibraryCentral = JSON.parse(body)
       LibraryCentral((err, livros)=>{
           if(err){
               response.writeHead(500, {"Content-Type": "aplication/json"})
               response.end(JSON.stringify({messag: "Erro ao ler livro"}))
               return
           }
           LibraryCentral.id = uuidv4();
           livros.push(LibraryCentral);

           fs.writeFile("livro.json" , JSON.stringify(livro, null,2), (err)=>{})
           if(err){
               
               response.writeHead(500, {"Content-Type": "aplication/json"})
               response.end(JSON.stringify({message: "Pagina não encontrada"}))
               return
           }
           response.writeHead(500, {"Content-Type": "aplication/json"})
           response.end(JSON.stringify())
       }); 
}else if(method === 'POST' && url.startsWith('/editores/')){

}else if(method === 'GET' && url.startsWith('/livro/{id_livro}/')){
    const urlParams = new URLSearchParams(url.split("?")[1])
    const termo = urlParams.get("termo")
    console.log(termo)

    LibraryCentral((err, livros)=>{
        if(err){
            response.writeHead(500, {'content-Type': 'application/json'})
            response.end(JSON.stringify({message: "Erro ao ler dados das livro"}))
            return
        }
        const resultado = livro.filter(
            (livro)=>
        livro.nome.includes(termo) ||
        livros.categoria.includes(termo) ||
        
        livros.bibliográficas.some((bibliográficas)=>
        bibliográficas.includes(termo)
        )
        )
        if(resultado.lenght === 0){
            response.writeHead(404, {'content-Type': 'application/json'})
            response.end(JSON.stringify({message:"Não encontrada um livro com o termo"=termo}))
            return
        }
        response.writeHead(200, {'content-Type': 'application/json'})
        response.end(resultado)
    });  
}else if(method === 'PUT' && url.startsWith('/editores/{id_livro}/')){
}else if(method === 'DELETE' && url.startsWith('/autores/{id_livro}/')){
}else if(method === 'GET' && url.startsWith('/editores/')){
}

server.listen(PORT, () =>{
    console.log(`Servidor on port http://localhost:${PORT}`);
});
