
const API_APP = "http://localhost:3000/app";
const API_TOPICOS = "http://localhost:3000/topicos";



let appData = {};
let topicos = [];
let topicoAtual = null;



const topicsList = document.getElementById("topics-list");

const discussionTitle =
    document.getElementById("discussion-title");

const discussionAuthor =
    document.getElementById("discussion-author");

const discussionContent =
    document.getElementById("discussion-content");

const commentsContainer =
    document.getElementById("comments-container");

const commentInput =
    document.getElementById("comment-input");

const publishBtn =
    document.getElementById("publish-btn");

const btnCriarTopico =
    document.getElementById("btnCriarTopico");



async function carregarDados() {

    try {

        const [appResponse, topicosResponse] =
            await Promise.all([
                fetch(API_APP),
                fetch(API_TOPICOS)
            ]);

        appData =
            await appResponse.json();

        topicos =
            await topicosResponse.json();

        topicoAtual =
            topicos.find(topico => topico.ativo) ||
            topicos[0] ||
            null;

        renderTopics();
        renderDiscussion();

    } catch (erro) {

        console.error(
            "Erro ao carregar dados:",
            erro
        );

    }

}



function renderTopics() {

    const cabecalho =
        topicsList.querySelector(".topics-header");

    topicsList
        .querySelectorAll(".topic-item")
        .forEach(item => item.remove());

    if (!cabecalho) return;

    topicos.forEach(topico => {

        const article =
            document.createElement("article");

        article.className =
            `topic-item p-3 ${
                topicoAtual &&
                topico.id === topicoAtual.id
                    ? "active"
                    : ""
            }`;

        article.innerHTML = `
            <h6 class="mb-1">
                ${topico.titulo}
            </h6>

            <p class="text-muted mb-1 small">
                ${topico.descricao}
            </p>

            <span class="tag">
                ${topico.categoria}
            </span>
        `;

        article.addEventListener("click", () => {

            topicoAtual = topico;

            renderTopics();
            renderDiscussion();

        });

        topicsList.appendChild(article);

    });

}



function renderDiscussion() {

    if (!topicoAtual) {

        discussionTitle.textContent =
            "Nenhuma discussão disponível";

        discussionAuthor.innerHTML = "";

        discussionContent.textContent = "";

        commentsContainer.innerHTML = "";

        return;

    }

    discussionTitle.textContent =
        topicoAtual.titulo;

    discussionAuthor.innerHTML = `
        <span>
            <i class="bi bi-person-circle"></i>
            ${topicoAtual.autor.nome}
        </span>
    `;

    discussionContent.textContent =
        topicoAtual.conteudo;

    renderComments();

}

function renderComments() {

    commentsContainer.innerHTML = "";

    if (!topicoAtual.comentarios?.length) {

        commentsContainer.innerHTML = `
            <p class="text-muted">
                Nenhum comentário ainda.
            </p>
        `;

        return;

    }

    topicoAtual.comentarios.forEach(comentario => {

        const card =
            document.createElement("div");

        card.className =
            "comment-card mb-3";

        card.innerHTML = `
            <div class="d-flex justify-content-between">

                <strong>
                    ${comentario.autor}
                </strong>

            </div>

            <p class="mb-0 mt-2">
                ${comentario.mensagem}
            </p>
        `;

        commentsContainer.appendChild(card);

    });

}


publishBtn.addEventListener(
    "click",
    async () => {

        if (!topicoAtual) {

            alert(
                "Selecione uma discussão."
            );

            return;

        }

        const textoComentario =
            commentInput.value.trim();

        if (!textoComentario) {

            alert(
                "Digite um comentário."
            );

            return;

        }

        const novoComentario = {

            id: Date.now(),

            autor: "Usuário Atual",

            mensagem: textoComentario

        };

        topicoAtual.comentarios.push(
            novoComentario
        );

        try {

            await fetch(
                `${API_TOPICOS}/${topicoAtual.id}`,
                {
                    method: "PATCH",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({
                        comentarios:
                            topicoAtual.comentarios
                    })
                }
            );

            renderComments();

            commentInput.value = "";

        } catch (erro) {

            console.error(
                "Erro ao salvar comentário:",
                erro
            );

        }

    }
);



btnCriarTopico.addEventListener(
    "click",
    async () => {

        const titulo =
            document
                .getElementById(
                    "tituloTopico"
                )
                .value
                .trim();

        const descricao =
            document
                .getElementById(
                    "descricaoTopico"
                )
                .value
                .trim();

        const categoria =
            document.getElementById(
                "categoriaTopico"
            ).value;

        const conteudo =
            document
                .getElementById(
                    "conteudoTopico"
                )
                .value
                .trim();

        if (
            !titulo ||
            !descricao ||
            !categoria ||
            !conteudo
        ) {

            alert(
                "Preencha todos os campos."
            );

            return;

        }

        try {


            const topicoAtivo =
                topicos.find(
                    topico => topico.ativo
                );

            if (topicoAtivo) {

                await fetch(
                    `${API_TOPICOS}/${topicoAtivo.id}`,
                    {
                        method: "PATCH",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body: JSON.stringify({
                            ativo: false
                        })
                    }
                );

            }


            const novoTopico = {

                ativo: true,

                titulo,

                descricao,

                categoria,

                autor: {
                    id: 999,
                    nome: "Usuário Atual"
                },

                conteudo,

                comentarios: []

            };

            await fetch(
                API_TOPICOS,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify(
                        novoTopico
                    )
                }
            );


            document.getElementById(
                "tituloTopico"
            ).value = "";

            document.getElementById(
                "descricaoTopico"
            ).value = "";

            document.getElementById(
                "categoriaTopico"
            ).selectedIndex = 0;

            document.getElementById(
                "conteudoTopico"
            ).value = "";


            const collapseElement =
                document.getElementById(
                    "novoTopicoForm"
                );

            const collapse =
                bootstrap.Collapse.getOrCreateInstance(
                    collapseElement
                );

            collapse.hide();

            await carregarDados();

        } catch (erro) {

            console.error(
                "Erro ao criar tópico:",
                erro
            );

        }

    }
);



document.addEventListener(
    "DOMContentLoaded",
    carregarDados
);