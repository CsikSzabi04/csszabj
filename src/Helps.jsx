import React from "react";

const codeSnippets = [
  {
    title: "pnpm Setup",
    tags: ["BackEnd"],
    code: `pnpm init
pnpm i cors express mysql mysql2 fs`,
  },
    {
    title: "package.json Setup",
    tags: ["BackEnd"],
    code: `"type": "module",
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node index.js",
    "dev": "node --watch index.js"
},`,
  },
  {
    title: "Express + MySQL Connection Setup",
    tags: ["BackEnd"],
    code: `import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";

const app = express();
app.use(express.json());
app.use(cors());

let con = null;
con = await mysql.createConnection({
    host: "localhost",
    port: 3306,
    database: "adatbazisneve",
    user: "root",
    password: ""
});`,
  },
  {
    title: "Basic Express Routes",
    tags: ["BackEnd"],
    code: `app.get("/", (req, resp) => resp.send("<h1>HAHA v1.0.0</h1>"));
app.get("/all", getAll);

app.listen(88, (err) => {
    if (err) console.log(err); else console.log("Server on :88");
});`,
  },
  {
    title: "GET  -- (when you don't need req.body)",
    tags: ["BackEnd"],
    code: `async function getAll(req, resp) {
    let sql = \`SELECT * FROM asd WHERE xyz=\${req.params.xyz} \`;
    try {
        const [json] = await con.query(sql);
        resp.send(json);
    } catch (err) { resp.status(500).send({ error: err }); }
}`,
  },
  {
    title: "POST  -- (when you need req.body and POST)",
    tags: ["BackEnd"],
    code: `async function postInfo(req, resp) {
    if(req.body.asd && req.body.sdf && req.body.dfg){
        let sql = \`insert into ghj set asd="\${req.body.asd}", sdf="\${req.body.sdf}", dfg="\${req.body.dfg}"\`;
        try{
            const [ json ] = await con.query(sql);
            resp.send(json);
        }catch{
            resp.status(400).send({err:error});
        }
    }
}`,
  },
  {
    title: "DELETE",
    tags: ["BackEnd"],
    code: `async function delASD(req, resp) {
    if(req.params.asd){
        let sql = \`delete from adatbazisnev where asd="\${req.params.asd}"\`;
        try{
            const [ json ] = await con.query(sql);
            resp.send(json);
        }catch{
            resp.status(400).send({err:error});
        }
    }
}`,
  },
  {
    title: "PUT",
    tags: ["BackEnd"],
    code: `async function putTan(req, resp) {
    if (req.body.taz && req.body.nev && req.body.rov && req.body.kaz) {
        let sql = \`UPDATE tantargy set nev="\${req.body.nev}", rov="\${req.body.rov}", kaz=\${req.body.kaz} where taz=\${req.body.taz}\`;
        try {
            const [json] = await con.query(sql);
            resp.send(json);
        } catch (error) {
            resp.status(500).send("Hiba");
        }
    } else resp.status(404).send("Hiba");
}`,
  },
  // If you want, you can add FrontEnd snippets here like:
  // {
  //   title: "React Example",
  //   tags: ["FrontEnd"],
  //   code: `// Your React code snippet here`,
  // },



    // FrontEnd snippets
  {
    title: "Create Vite React Project",
    tags: ["FrontEnd"],
    code: `pnpm create vite .
(React and JavaScript) 
pnpm install
pnpm run dev`,
  },
  {
    title: "index.css Background Image",
    tags: ["FrontEnd"],
    code: `body {
  background-image: url("./assets/header_img.jpg"); 
  background-attachment: fixed; 
  background-repeat: no-repeat; 
  background-size: cover; 
  background-position: center;
}`,
  },
  {
    title: "React Router Setup (App.jsx)",
    tags: ["FrontEnd"],
    code: `pnpm i react-router-dom

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  { element: <Layout />, children: [
    { path: "/", element: <Home /> },
  ]}
]);

<RouterProvider router={router} />`,
  },
  {
    title: "Layout.jsx",
    tags: ["FrontEnd"],
    code: `import React from 'react';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div>
      <Outlet />
    </div>
  )
}`,
  },
  {
    title: "Material UI Setup",
    tags: ["FrontEnd"],
    code: `pnpm i @mui/material

import { Button } from '@mui/material';`,
  },
  {
    title: "useEffect Fetch & map",
    tags: ["FrontEnd"],
    code: `const [asd, setAsd] = useState([]);

useEffect(() => {
  async function getAsd() {
    const resp = await fetch("http://localhost:88/api/asdasd");
    const json = await resp.json();
    setAsd(json);
  }
  getAsd();
}, []);

{asd.map(x => (
  <div key={x.id} className="">
    <h4>{x.aasd}</h4>
    <Link to={"/sdf/" + x.id}>
      <img src={x.kepUrl} alt={x.aasd} className="img-fluid" />
    </Link>
  </div>
))}`,
  },
  {
    title: "PUT/POST Request Example",
    tags: ["FrontEnd"],
    code: `async function rendel() {
  const resp = await fetch("http://localhost:88/api/flowers/" + id, {
    method: "PUT/POST",
    headers: {"Content-type":"application/json"},
    body: JSON.stringify({ nev: virag.nev, leiras: virag.leiras, keszlet: (virag.keszlet - mennyi) })
  });
  const json = await resp.json();
}`,
  },
  {
    title: "Input Value Change Handling",
    tags: ["FrontEnd"],
    code: `const [mennyi, setMennyi] = useState(1);

<input
  type="number"
  name="mennyiseg"
  id="mennyiseg"
  min="1"
  max="999"
  defaultValue="1"
  value={mennyi}
  onChange={e => checkMennyi(e.target.value)}
/>`,
  },
  {
    title: "Conditional Button Rendering",
    tags: ["FrontEnd"],
    code: `{virag.keszlet ? (
  <button
    type="button"
    className="btn btn-warning btn-lg"
    onClick={rendel}
  >
    Megrendelem
  </button>
) : (
  "Jelenleg nincs a termékből készleten, keresse fel oldalunkat később!"
)}`,
  },
  {
    title: "POST with Material UI TextField and Button",
    tags: ["FrontEnd"],
    code: `const [refresh, setRefresh] = useState(false);
const [nev, setNev] = useState('');
const [kod, setKod] = useState('');

async function addSzin() {
  const szinek = { nev, kod };
  const resp = await fetch("https://szinek-backend-8oow.onrender.com/szin", {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(szinek),
  });
  setRefresh(!refresh);
}

return (
  <div>
    <div className='lista'>
      <TextField
        required
        label="Név"
        value={nev}
        className='tf'
        onChange={e => setNev(e.target.value)}
      />
      <TextField
        required
        label="Kód"
        value={kod}
        className='tf'
        onChange={e => setKod(e.target.value)}
      />
      <Button
        className='add'
        variant="contained"
        color="success"
        onClick={addSzin}
      >
        Hozzáad
      </Button>
    </div>
  </div>
);`,
  },


];

const Section = ({ label }) => {
  const filteredSnippets = codeSnippets.filter((snippet) =>
    snippet.tags.includes(label)
  );

  return (
    <div className="w-1/2 min-h-screen p-6 overflow-y-auto">
      <h1 className="text-3xl font-bold mb-6 gradient-text">{label} Section</h1>
      {filteredSnippets.map((snippet, index) => (
        <div
          key={`${label}-${index}`}
          className="bg-black bg-opacity-70 p-6 rounded-2xl shadow-lg mb-8 max-w-full fade-in visible"
        >
          <h2 className="text-xl font-bold gradient-text mb-4">
            {snippet.title} -- ({label})
          </h2>
          <pre className="overflow-x-auto text-sm leading-relaxed">
            <code className="whitespace-pre-wrap">{snippet.code}</code>
          </pre>
        </div>
      ))}
    </div>
  );
};

const Help = () => {
  return (
    <div className="scroll-container text-gray-100 font-sans antialiased">
      <a href="https://github.com/gillichbalint01/help" target="_blank">Gilli</a>
      <div className="flex w-screen min-h-screen">
        <Section label="BackEnd" />
        <Section label="FrontEnd" />
      </div>
    </div>
  );
};

export default Help;
