import express from 'express'
import DigestFetch from 'digest-fetch'
import cors from 'cors'

const app = express();

app.use(cors());
app.use(express.json());

const client = new DigestFetch("admin", "9CLcj@MjcQq07");

const MAX_TENTATIVAS = 3;

async function abrirPorta() {
    return client.fetch(
        "http://192.168.110.160/ISAPI/AccessControl/RemoteControl/door/1",
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/xml",
            },
            body: `
            <RemoteControlDoor version="2.0" xmlns="http://www.isapi.org/ver20/XMLSchema">
                <cmd>open</cmd>
            </RemoteControlDoor>
`,
        }
    );
}

app.post("/api/desbloquear", async (req, res) => {
    try {
        let response;
        for (let tentativa = 1; tentativa <= MAX_TENTATIVAS; tentativa++) {
            response = await abrirPorta();
            if (response.status !== 401) break;
            console.warn(`Tentativa ${tentativa} falhou com 401, tentando novamente...`);
        }

        const text = await response.text();

        res.status(response.status).send(text);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            erro: err.message,
        });
    }
});

app.listen(3001, () => {
    console.log("Servidor iniciado");
});
