async function buscarAlquotaISS() {
  let endereco = document.getElementById("cep").value;

  try {
    const response = await fetch(`https://viacep.com.br/ws/${endereco}/json/`);
    const data = await response.json();

    let enderecoCompleto = `${data.logradouro}, ${data.bairro}`;
    let ufMunicipio = `${data.uf} - Município: ${data.localidade}`;

    document.getElementById("enderecoNota").textContent = enderecoCompleto;
    document.getElementById("telefoneNota").textContent = `${document.getElementById("telefone").value}`;
    document.getElementById("emailNota").textContent = `${document.getElementById("email").value}`;
    document.getElementById("ufMunicipioNota").textContent = ufMunicipio;

  } catch (error) {
    console.error('Erro ao buscar informações do endereço:', error);
  }
}

function formatarNumeroBrasileiro(numero) {
  return numero.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function preencherDadosTomador() {
  let nomeTomador = document.getElementById("nomeTomador").value;
  let enderecoTomador = document.getElementById("enderecoTomador").value;
  let telefoneTomador = document.getElementById("telefoneTomador").value;
  let emailTomador = document.getElementById("emailTomador").value;
  let ufMunicipioTomador = document.getElementById("ufMunicipioTomador").value;

  document.getElementById("nomeTomadorNota").textContent = nomeTomador;
  document.getElementById("enderecoTomadorNota").textContent = enderecoTomador;
  document.getElementById("telefoneTomadorNota").textContent = `Telefone: ${telefoneTomador}`;
  document.getElementById("emailTomadorNota").textContent = `E-mail: ${emailTomador}`;
  document.getElementById("ufMunicipioTomadorNota").textContent = `Município/UF: ${ufMunicipioTomador}`;
}

function calcularNotaFiscal() {
  buscarAlquotaISS(); 
  preencherDadosTomador();

  let nomePrestador = document.getElementById("nomePrestador").value;
  let valorServico = parseFloat(document.getElementById("valorServico").value);
  let descricaoServico = document.getElementById("descricaoServico").value;
  let aliquotaISS = parseFloat(document.getElementById("aliquotaISS").value);

  let valorISS = (aliquotaISS / 100) * valorServico;
  let total = valorServico + valorISS;

  document.getElementById("prestadorNota").textContent = nomePrestador;
  document.getElementById("dataEmissaoNota").textContent = document.getElementById("dataEmissao").value;
  document.getElementById("numeroNFSNota").textContent = document.getElementById("numeroNFS").value;
  document.getElementById("serieRPSNota").textContent = document.getElementById("serieRPS").value;
  document.getElementById("numeroRPSNota").textContent = document.getElementById("numeroRPS").value;
  document.getElementById("cnpjCpfNota").textContent = document.getElementById("cnpjCpf").value;
  document.getElementById("descricaoServicoNota").textContent = descricaoServico;
  document.getElementById("conjuntoTributacaoNota").textContent = document.getElementById("conjuntoTributacao").value;
  document.getElementById("codigoServicoNota").textContent = document.getElementById("codigoServico").value;
  document.getElementById("valorServicoNota").textContent = formatarNumeroBrasileiro(valorServico);
  document.getElementById("aliquotaISSNota").textContent = aliquotaISS.toFixed(2);
  document.getElementById("valorISSNota").textContent = formatarNumeroBrasileiro(valorISS);
  document.getElementById("totalNota").textContent = formatarNumeroBrasileiro(total);

  document.getElementById("notaFiscal").style.display = "block";
}
