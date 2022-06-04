// ---
// Constantes Globais

  // Infos da especialidade
const nome = document.getElementById('es-nome')
const req = document.getElementById('es-requisitos')

// ---

function especialidade(){
    // Muda o nome do botão

    document.querySelector('.es-genbutton').innerText = "Gerar outra especialidade"
    // Gerar um número aleatório entre 0 e 4 para decidir qual categoria será exibida
    // 0 = Ciencia e Tecnologia, 1 = Cultura, 2 = Desportos, 3 = Habilidades Escoteiras, 4 = Serviços

    const category = Math.floor(Math.random() * (2 - 0 + 1)) + 0 ;
    //console.log(category)


    // Requisição da API de Especialidades
    axios.get('https://especialidade.netlify.app/especialidades.json')
    .then(function (response) {
      // Manipulando resultados
        const res = response.data[category].especialidades

        // Especialidade escolhida utilizando um número aleatório com base na quantidade de elementos da categoria exibida
        const especialidade = (res[res.length * Math.random() | 0])

        console.log(especialidade)
        // Edita os valores da página com a especialidade escolhida 
        nome.innerText = especialidade.nome

        // Checa se os parágrafos de requisitos já existem
                
        if (!document.querySelector('.es-reqs')) {
          //console.log('Não foi deletado nada')
        }

        // Caso existam, serão deletados e criados novamente
        else{   
            while (req.firstChild) {
                req.removeChild(req.firstChild);
            }
          //console.log('Parágrafos deletados')
        }

        // Cria <p> com os requisitos
        especialidade.requisitos.forEach(reqpar)


        function reqpar(item, index){
          const p = document.createElement("p")
          p.setAttribute("id", `es-r${index}`)
          p.setAttribute("class", `es-reqs`)
          p.innerText = `${index + 1} - ${item}`
          req.appendChild(p)
        }

        // Pega o número mínimo de requisitos
        const minreq = especialidade.nivelum
        //console.log(minreq)

        // Cria uma array com os requisitos na tela
        const reqarray = Array.apply(null,document.querySelectorAll('.es-reqs'))
        const reqshuffle = reqarray.sort(() => Math.random() - 0.5)

        // Escolhe o número mínimo de requisitos em requisitos aleatórios
        const reqslice = reqshuffle.slice(0, minreq)
        const reqfinal = reqslice.map(item => item.id)
        reqfinal.forEach((item, index) => {
          // Atribui a eles uma classe para decoração
          document.getElementById(`${item}`).setAttribute("class", `es-reqs-chosen`)
        })

      })
      .catch(function (error) {
        console.error(error);
      })



}