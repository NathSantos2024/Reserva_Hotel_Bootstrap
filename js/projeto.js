// Função para adicionar reserva
function adicionarReserva(event) {
    event.preventDefault(); // Evita que o formulário seja enviado

    // Obtém os valores dos campos do formulário
    var nomeCliente = document.getElementById("nomeCliente").value;
    var emailCliente = document.getElementById("emailCliente").value;
    var tipoAlojamento = document.getElementById("tipoAlojamento").value;
    var dataEntrada = document.getElementById("dataEntrada").value;

    // Verifica se todos os campos estão preenchidos
    if (nomeCliente === "" || emailCliente === "" || tipoAlojamento === "" || dataEntrada === "") {
        document.getElementById("aviso").innerHTML = "<div class='alert alert-danger'>Por favor, preencha todos os campos.</div>";
        return;
    }

    // Cria um objeto com os dados da reserva
    var reserva = {
        nome: nomeCliente,
        email: emailCliente,
        alojamento: tipoAlojamento,
        checkin: dataEntrada
    };

    // Adiciona a reserva à lista de reservas
    adicionarReservaNaLista(reserva);

    // Limpa o formulário
    document.getElementById("formulario").reset();

    // Exibe uma mensagem de sucesso
    document.getElementById("aviso").innerHTML = "<div class='alert alert-success'>Reserva adicionada com sucesso!</div>";
}

// Função para adicionar reserva na lista de reservas
function adicionarReservaNaLista(reserva) {
    // Cria uma nova linha na tabela com os dados da reserva e um botão Info
    var newRow = "<tr>" +
                    "<td>" + reserva.nome + "</td>" +
                    "<td>" + reserva.email + "</td>" +
                    "<td>" + reserva.alojamento + "</td>" +
                    "<td>" + reserva.checkin + "</td>" +
                    "<td><button class='btn btn-info info-btn'>Info</button></td>" +
                    "<td><button class='btn btn-primary checkout-btn'>Check-out</button></td>" +
                 "</tr>";

    // Adiciona a nova linha à tabela
    document.getElementById("resultados").innerHTML += newRow;
}

// Função para mostrar as informações da reserva
function mostrarInfo(event) {
    var button = event.target;
    var row = button.parentNode.parentNode;
    var cells = row.getElementsByTagName("td");
    var nome = cells[0].innerText;
    var email = cells[1].innerText;
    var alojamento = cells[2].innerText;
    var checkin = cells[3].innerText;

    // Exibe as informações da reserva
    alert("Informações da Reserva:\nNome: " + nome + "\nEmail: " + email + "\nAlojamento: " + alojamento + "\nCheck-in: " + checkin);
}

// Adiciona event listener para o botão "Info" usando delegação de eventos
document.addEventListener("click", function(event) {
    if (event.target.classList.contains("info-btn")) {
        mostrarInfo(event);
    }
});

// Adiciona event listener para o botão "Check-out" usando delegação de eventos
document.addEventListener("click", function(event) {
    if (event.target.classList.contains("btn") && event.target.textContent === "Check-out") {
        var row = event.target.parentNode.parentNode;
        var checkinDate = row.cells[3].textContent;

        // Cria um elemento de entrada de data para selecionar a data de check-out
        var checkoutDate = prompt("Digite a data de saída (Check-out):", checkinDate);
        if (checkoutDate === null || checkoutDate === "") {
            return; // Se o usuário cancelar ou deixar em branco, não faz nada
        }

        // Calcula o número de dias entre o check-in e o check-out
        var daysDiff = calcularDiferencaDias(checkinDate, checkoutDate);

        // Solicita o valor diário para pagar
        var valorDiario = parseFloat(prompt("Digite o valor diário para pagar em Euros:", ""));
        if (isNaN(valorDiario) || valorDiario <= 0) {
            alert("Por favor, digite um valor válido para pagar.");
            return;
        }

        // Calcula o valor total da estadia
        var valorTotal = daysDiff * valorDiario;

        // Exibe o valor total da estadia
        alert("Valor total da estadia: " + valorTotal.toFixed(2) + "€");
    }
});

// Função para calcular a diferença de dias entre duas datas
function calcularDiferencaDias(checkinDate, checkoutDate) {
    var checkin = new Date(checkinDate);
    var checkout = new Date(checkoutDate);
    var diff = checkout.getTime() - checkin.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24)); // Retorna a diferença em dias, arredondada para cima
}

// Função para limpar todas as reservas
function limparReservas() {
    // Limpa a lista de reservas
    document.getElementById("resultados").innerHTML = "";
    // Exibe uma mensagem de sucesso
    document.getElementById("aviso").innerHTML = "<div class='alert alert-info'>Todas as reservas foram removidas.</div>";
}

// Função para exibir as reservas ao carregar a página
function mostraReservas() {
}

// Adiciona os event listeners aos elementos do formulário e ao botão de limpar reservas
document.getElementById("formulario").addEventListener("submit", adicionarReserva);
document.getElementById("limparReservas").addEventListener("click", limparReservas);

// Restaura o estilo do botão "Limpar Reservas"
this.style.backgroundColor = '#99ccff';



