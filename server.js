import http from "http";
import fs from "fs";

const PORT = 4000;

const server = http.createServer( (req, res) => {

    // fs.readFile("test.txt",(err,data)=>{
    //     if (err) throw err;
    //     const text = data.toString();
    //     res.end(text);
    // })

    // const data = fs.readFileSync("test.txt");

    const stream = fs.createReadStream("test.txt");
    stream.on("data", (chunk)=>{
        console.log("Chunk:",chunk.toString())
    })
    stream.on("end",()=>{
        console.log("File read is finished")
    })

    // fs.writeFile("new.txt","this is new file.", (err)=>{
    //     if (err) throw err;
    //     console.log("File is created")
    // })

    // const buf = Buffer.from("hello");
    // Buffer.alloc(10)
    // console.log(buf)

    res.end("hello");
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


//callback hell - nesting callbacks
// method.(()=>{
//     methode2.(()=>{
//         method3.(()=>{
            
//         })
//     })
// })