// Tipos para o sistema ERP de Licitações Públicas
// Conforme Lei 14.133/21 (Nova Lei de Licitações)

// =====================================================
// TIPOS BASE E ENUMS
// =====================================================

export type StatusLicitacao = 'Aberta' | 'Em andamento' | 'Encerrada' | 'Cancelada'
export type TipoProcesso = 'Licitação' | 'Emergencial' | 'Indenizatório' | 'Dispensa' | 'Inexigibilidade'
export type ModalidadeLicitacao = 'Pregão Eletrônico' | 'Pregão Presencial' | 'Concorrência' | 'Tomada de Preços' | 'Convite' | 'Concurso' | 'Leilão'
export type StatusContrato = 'Vigente' | 'Suspenso' | 'Encerrado' | 'Rescindido'
export type TipoContrato = 'Contrato' | 'ARP'
export type StatusPagamento = 'Pendente' | 'Pago' | 'Atrasado'
export type StatusRecebimento = 'Pendente' | 'Recebido' | 'Atrasado'
export type StatusEntrega = 'Pendente' | 'Separado' | 'Enviado' | 'Entregue' | 'Atrasado'
export type StatusSEFAZ = 'Pendente' | 'Autorizada' | 'Rejeitada' | 'Cancelada'
export type TipoMovimentacao = 'Entrada' | 'Saída' | 'Ajuste' | 'Transferência'
export type TipoSaida = 'Venda' | 'Doação' | 'Perda' | 'Amostra' | 'Uso Interno'
export type NivelAlerta = 'INFO' | 'ALERTA' | 'CRITICO'
export type EsferaOrgao = 'Municipal' | 'Estadual' | 'Federal'
export type RegimeTributario = 'Simples Nacional' | 'Lucro Presumido' | 'Lucro Real'
export type PorteEmpresa = 'MEI' | 'ME' | 'EPP' | 'Médio' | 'Grande'
export type StatusFornecedor = 'Ativo' | 'Inativo' | 'Bloqueado'
export type TipoFrete = 'FOB' | 'CIF'
export type TipoConta = 'Corrente' | 'Poupança'

// Novos tipos para comprovantes financeiros
export type MetodoPagamento = 'PIX' | 'Transferência' | 'Boleto' | 'Cartão Crédito' | 'Cartão Débito' | 'Dinheiro' | 'Cheque'
export type TipoRecebimento = 'PIX' | 'TED/DOC' | 'Ordem Bancária' | 'Depósito' | 'Cheque'
export type StatusComprovante = 'Pago' | 'Parcialmente Pago' | 'Pendente'
export type StatusEntregaCompleto = 'Em trânsito' | 'Entregue' | 'Conferido' | 'Aceito' | 'Recusado'
export type TipoPastaVirtual = 'pasta' | 'arquivo'

// =====================================================
// INTERFACES DE USUÁRIOS E PERMISSÕES
// =====================================================

export interface Perfil {
  id: number
  nome: string
  descricao?: string
  ativo: boolean
  created_at: string
}

export interface Usuario {
  id: number
  nome_completo: string
  cpf: string
  email: string
  telefone?: string
  cargo?: string
  departamento?: string
  username: string
  perfil_id: number
  perfil?: Perfil
  forcar_troca_senha: boolean
  ativo: boolean
  foto_url?: string
  ultimo_login?: string
  created_at: string
  updated_at: string
}

export interface Permissao {
  id: number
  modulo: string
  acao: string
  descricao?: string
}

export interface LogAuditoria {
  id: number
  usuario_id?: number
  usuario?: Usuario
  acao: string
  modulo: string
  registro_id?: number
  dados_antes?: any
  dados_depois?: any
  ip_address?: string
  user_agent?: string
  created_at: string
}

// =====================================================
// INTERFACES DE CADASTROS BASE
// =====================================================

export interface Empresa {
  id: number
  razao_social: string
  nome_fantasia?: string
  cnpj: string
  inscricao_estadual?: string
  inscricao_municipal?: string
  cnae?: string
  regime_tributario?: RegimeTributario
  porte?: PorteEmpresa
  cep?: string
  logradouro?: string
  numero?: string
  complemento?: string
  bairro?: string
  cidade?: string
  estado?: string
  telefone?: string
  email?: string
  website?: string
  ativo: boolean
  created_at: string
  contas_bancarias?: ContaBancaria[]
  documentos?: DocumentoEmpresa[]
  representantes?: RepresentanteLegal[]
  socios?: Socio[]
}

export interface ContaBancaria {
  id: number
  empresa_id: number
  banco: string
  agencia: string
  conta: string
  tipo_conta: TipoConta
  pix?: string
  conta_principal: boolean
  ativo: boolean
}

export interface DocumentoEmpresa {
  id: number
  empresa_id: number
  tipo_documento: string
  numero?: string
  data_emissao?: string
  data_validade?: string
  arquivo_url?: string
  ativo: boolean
}

export interface RepresentanteLegal {
  id: number
  empresa_id: number
  nome: string
  cpf: string
  rg?: string
  cargo?: string
  email?: string
  telefone?: string
  procuracoes?: string
  ativo: boolean
}

export interface Socio {
  id: number
  empresa_id: number
  nome: string
  cpf: string
  participacao_percentual?: number
  ativo: boolean
}

export interface CategoriasProdutos {
  id: number
  nome: string
  codigo: string
  categoria_pai_id?: number
  categoria_pai?: CategoriasProdutos
  subcategorias?: CategoriasProdutos[]
  descricao?: string
  ativo: boolean
  created_at: string
}

export interface Produto {
  id: number
  codigo_interno: string
  codigo_barras?: string
  nome: string
  descricao?: string
  categoria_id?: number
  categoria?: CategoriasProdutos
  unidade_medida: string
  marca?: string
  modelo?: string
  fabricante?: string
  ncm?: string
  cest?: string
  origem_mercadoria?: number
  // Tributação
  icms_aliquota: number
  icms_cst?: string
  ipi_aliquota: number
  ipi_cst?: string
  pis_aliquota: number
  pis_cst?: string
  cofins_aliquota: number
  cofins_cst?: string
  // Estoque
  estoque_atual: number
  estoque_minimo: number
  estoque_maximo: number
  localizacao?: string
  controle_lote: boolean
  ativo: boolean
  created_at: string
  updated_at: string
  // Relacionamentos
  cotacoes_historico?: CotacaoHistorico[]
  precos_venda?: PrecoVenda
  alertas?: ProdutoAlerta[]
}

export interface CotacaoHistorico {
  id: number
  produto_id: number
  produto?: Produto
  fornecedor_id?: number
  fornecedor?: Fornecedor
  preco_custo: number
  data_cotacao: string
  data_validade?: string
  documento_url?: string
  usuario_id?: number
  usuario?: Usuario
  observacoes?: string
  created_at: string
}

export interface PrecoVenda {
  id: number
  produto_id: number
  preco_minimo: number
  preco_maximo: number
  preco_sugerido: number
  preco_atual: number
  margem_minima: number
  margem_maxima: number
  incluir_frete: boolean
  valor_frete: number
  usuario_alteracao?: number
  usuario?: Usuario
  data_alteracao: string
}

export interface ProdutoAlerta {
  id: number
  produto_id: number
  produto?: Produto
  tipo_alerta: string
  descricao: string
  nivel: NivelAlerta
  ativo: boolean
  created_at: string
}

export interface Fornecedor {
  id: number
  razao_social: string
  cnpj_cpf: string
  inscricao_estadual?: string
  telefone?: string
  email?: string
  website?: string
  cep?: string
  logradouro?: string
  numero?: string
  complemento?: string
  bairro?: string
  cidade?: string
  estado?: string
  categoria_fornecimento?: string
  rating?: number
  status: StatusFornecedor
  prazo_pagamento?: number
  forma_pagamento?: string
  desconto_percentual: number
  tipo_frete?: TipoFrete
  prazo_entrega_dias?: number
  pedido_minimo?: number
  created_at: string
  updated_at: string
  contatos?: FornecedorContato[]
  avaliacoes?: FornecedorAvaliacao[]
}

export interface FornecedorContato {
  id: number
  fornecedor_id: number
  nome: string
  cargo?: string
  setor?: string
  telefone?: string
  email?: string
  whatsapp?: string
  aniversario?: string
  observacoes?: string
  ativo: boolean
}

export interface FornecedorAvaliacao {
  id: number
  fornecedor_id: number
  qualidade_percentual?: number
  pontualidade_percentual?: number
  preco_percentual?: number
  atendimento_percentual?: number
  nota_geral?: number
  data_avaliacao?: string
  usuario_id?: number
  usuario?: Usuario
  observacoes?: string
}

export interface OrgaoPublico {
  id: number
  razao_social: string
  cnpj: string
  inscricao_estadual?: string
  inscricao_municipal?: string
  cep?: string
  logradouro?: string
  numero?: string
  complemento?: string
  bairro?: string
  cidade?: string
  estado?: string
  telefone?: string
  email?: string
  website?: string
  esfera?: EsferaOrgao
  tipo?: string
  ativo: boolean
  created_at: string
}

// =====================================================
// INTERFACES DE LICITAÇÕES E PROCESSOS
// =====================================================

export interface Licitacao {
  id: number
  numero_edital: string
  modalidade: ModalidadeLicitacao
  tipo_processo: TipoProcesso
  orgao_id?: number
  orgao?: OrgaoPublico
  objeto: string
  valor_estimado?: number
  data_abertura?: string
  data_entrega_propostas?: string
  data_sessao_publica?: string
  status: StatusLicitacao
  edital_url?: string
  nossa_participacao: boolean
  nossa_classificacao?: number
  valor_nossa_proposta?: number
  resultado?: string
  observacoes?: string
  created_at: string
  updated_at: string
  // Relacionamentos específicos por tipo
  dados_emergencial?: LicitacaoEmergencial
  dados_indenizatorio?: ProcessoIndenizatorio
  propostas?: Proposta[]
  contratos_arp?: ContratoARP[]
}

export interface LicitacaoEmergencial {
  id: number
  licitacao_id: number
  declaracao_emergencia: string
  risco_identificado: string
  justificativa_tecnica: string
  prazo_emergencia_dias: number
  data_ratificacao?: string
  autoridade_ratificacao?: string
  data_publicacao?: string
  necessita_licitacao_posterior: boolean
  created_at: string
}

export interface ProcessoIndenizatorio {
  id: number
  licitacao_id: number
  descricao_irregularidade: string
  periodo_servico_inicio: string
  periodo_servico_fim: string
  justificativa: string
  parecer_juridico: string
  parecer_juridico_obrigatorio: boolean
  aprovacao_autoridade_maxima: boolean
  data_aprovacao?: string
  autoridade_aprovacao?: string
  necessita_apuracao_responsabilidades: boolean
  created_at: string
}

export interface Proposta {
  id: number
  licitacao_id: number
  licitacao?: Licitacao
  valor_total: number
  prazo_entrega_dias?: number
  prazo_validade_dias?: number
  forma_pagamento?: string
  garantia_meses?: number
  incluir_frete: boolean
  valor_frete: number
  margem_desejada?: number
  lucro_esperado?: number
  observacoes?: string
  status: 'Rascunho' | 'Enviada' | 'Vencedora' | 'Perdedora'
  created_at: string
  itens?: PropostaItem[]
}

export interface PropostaItem {
  id: number
  proposta_id: number
  produto_id?: number
  produto?: Produto
  quantidade: number
  valor_unitario: number
  valor_total: number
  especificacoes_tecnicas?: string
}

export interface ContratoARP {
  id: number
  numero: string
  tipo: TipoContrato
  licitacao_id?: number
  licitacao?: Licitacao
  orgao_id?: number
  orgao?: OrgaoPublico
  data_assinatura?: string
  data_inicio?: string
  data_fim_vigencia?: string
  prazo_meses?: number
  permite_prorrogacao: boolean
  valor_total?: number
  valor_executado: number
  valor_saldo?: number
  representante_contratante?: string
  cpf_contratante?: string
  cargo_contratante?: string
  representante_contratada?: string
  cpf_contratada?: string
  cargo_contratada?: string
  status: StatusContrato
  created_at: string
  itens?: ContratoARPItem[]
  prorrogacoes?: ContratoProrrogacao[]
}

export interface ContratoARPItem {
  id: number
  contrato_arp_id: number
  produto_id?: number
  produto?: Produto
  quantidade_total: number
  quantidade_executada: number
  quantidade_saldo?: number
  valor_unitario: number
  valor_total: number
}

export interface ContratoProrrogacao {
  id: number
  contrato_arp_id: number
  numero_prorrogacao: number
  data_prorrogacao: string
  nova_data_fim: string
  prazo_adicional_meses: number
  justificativa: string
  valor_adicional: number
  termo_aditivo?: string
  created_at: string
}

export interface EmendaEntrega {
  id: number
  licitacao_id?: number
  licitacao?: Licitacao
  contrato_arp_id?: number
  contrato_arp?: ContratoARP
  numero_emenda: string
  data_prevista: string
  valor_parcial: number
  status: StatusEntrega
  data_entrega_real?: string
  observacoes?: string
  created_at: string
  produtos?: EmendaProduto[]
}

export interface EmendaProduto {
  id: number
  emenda_id: number
  produto_id?: number
  produto?: Produto
  quantidade: number
  valor_unitario: number
  valor_total: number
}

// =====================================================
// INTERFACES DE DOCUMENTOS FISCAIS
// =====================================================

export interface OrdemFornecimento {
  id: number
  numero: string
  ano_exercicio: number
  data_emissao: string
  orgao_id?: number
  orgao?: OrgaoPublico
  unidade_requisitante?: string
  setor?: string
  tipo_processo: TipoProcesso
  documento_base?: 'Contrato' | 'ARP'
  contrato_arp_id?: number
  contrato_arp?: ContratoARP
  licitacao_id?: number
  licitacao?: Licitacao
  modalidade?: string
  nota_empenho?: string
  emenda_entrega?: string
  prazo_entrega_dias: number
  data_limite_entrega?: string
  local_entrega: string
  endereco_entrega: string
  horario_entrega?: string
  responsavel_recebimento?: string
  telefone_responsavel?: string
  instrucoes_especiais?: string
  forma_pagamento?: string
  prazo_pagamento?: string
  condicoes_especiais?: string
  observacoes_gerais?: string
  valor_total: number
  status: 'Emitida' | 'Enviada' | 'Em Execução' | 'Entregue' | 'Cancelada'
  created_at: string
  itens?: OrdemFornecimentoItem[]
}

export interface OrdemFornecimentoItem {
  id: number
  ordem_fornecimento_id: number
  produto_id?: number
  produto?: Produto
  categoria?: string
  codigo_produto?: string
  marca?: string
  especificacoes_tecnicas?: string
  quantidade: number
  valor_unitario: number
  valor_total: number
}

export interface NotaEmpenho {
  id: number
  numero: string
  data_emissao: string
  exercicio: number
  orgao_id?: number
  orgao?: OrgaoPublico
  unidade_gestora?: string
  tipo_processo: TipoProcesso
  licitacao_id?: number
  licitacao?: Licitacao
  contrato_arp_id?: number
  contrato_arp?: ContratoARP
  modalidade?: string
  data_processo?: string
  credor_razao_social: string
  credor_cnpj: string
  credor_endereco?: string
  banco?: string
  agencia?: string
  conta?: string
  subtotal: number
  frete_incluso: boolean
  valor_frete: number
  desconto: number
  valor_total: number
  codigo_dotacao?: string
  natureza_despesa?: string
  fonte_recurso?: string
  observacoes_dotacao?: string
  status: 'Emitida' | 'Liquidada' | 'Paga' | 'Cancelada'
  created_at: string
  itens?: NotaEmpenhoItem[]
}

export interface NotaEmpenhoItem {
  id: number
  nota_empenho_id: number
  produto_id?: number
  produto?: Produto
  categoria?: string
  codigo_produto?: string
  quantidade: number
  valor_unitario: number
  valor_total: number
}

export interface ReciboEntrega {
  id: number
  numero: string
  data_entrega: string
  orgao_id?: number
  orgao?: OrgaoPublico
  setor_departamento?: string
  local_entrega: string
  endereco_entrega: string
  tipo_processo: TipoProcesso
  licitacao_id?: number
  licitacao?: Licitacao
  emenda_entrega?: string
  nota_empenho_id?: number
  nota_empenho?: NotaEmpenho
  contrato_arp_id?: number
  contrato_arp?: ContratoARP
  ordem_fornecimento_id?: number
  ordem_fornecimento?: OrdemFornecimento
  valor_entrega: number
  responsavel_recebimento: string
  cargo_responsavel?: string
  cpf_responsavel?: string
  matricula_responsavel?: string
  transportadora?: string
  nf_transporte?: string
  placa_veiculo?: string
  motorista?: string
  observacoes?: string
  status: 'Entregue' | 'Conferido' | 'Aceito' | 'Rejeitado'
  created_at: string
  itens?: ReciboEntregaItem[]
}

export interface ReciboEntregaItem {
  id: number
  recibo_entrega_id: number
  produto_id?: number
  produto?: Produto
  codigo_produto?: string
  categoria?: string
  quantidade_contratada?: number
  quantidade_entregue: number
  percentual_entregue?: number
  valor_unitario: number
  valor_total: number
  lote?: string
  data_validade?: string
}

export interface NotaFiscal {
  id: number
  numero: number
  serie: string
  data_emissao: string
  data_saida?: string
  hora_saida?: string
  natureza_operacao: string
  tipo_nf: 'Saída' | 'Entrada'
  orgao_id?: number
  orgao?: OrgaoPublico
  tipo_processo: TipoProcesso
  licitacao_id?: number
  licitacao?: Licitacao
  emenda_entrega?: string
  nota_empenho_id?: number
  nota_empenho?: NotaEmpenho
  recibo_entrega_id?: number
  recibo_entrega?: ReciboEntrega
  ordem_fornecimento_id?: number
  ordem_fornecimento?: OrdemFornecimento
  valor_total_produtos: number
  valor_total_impostos: number
  valor_frete: number
  outras_despesas: number
  valor_total_nfe: number
  informacoes_complementares?: string
  modalidade_frete?: 'Emitente' | 'Destinatário'
  transportadora?: string
  cnpj_transportadora?: string
  placa_veiculo?: string
  uf_veiculo?: string
  volumes?: number
  peso_bruto?: number
  status_sefaz: StatusSEFAZ
  protocolo_autorizacao?: string
  data_autorizacao?: string
  motivo_rejeicao?: string
  chave_acesso?: string
  xml_url?: string
  danfe_url?: string
  created_at: string
  itens?: NotaFiscalItem[]
}

export interface NotaFiscalItem {
  id: number
  nota_fiscal_id: number
  produto_id?: number
  produto?: Produto
  categoria?: string
  ncm?: string
  cfop?: string
  cst_icms?: string
  quantidade: number
  valor_unitario: number
  valor_total: number
  base_calculo_icms?: number
  aliquota_icms?: number
  valor_icms?: number
  aliquota_pis?: number
  valor_pis?: number
  aliquota_cofins?: number
  valor_cofins?: number
}

// =====================================================
// INTERFACES DE CONTROLE FINANCEIRO
// =====================================================

export interface EntradaCompra {
  id: number
  data_entrada: string
  fornecedor_id?: number
  fornecedor?: Fornecedor
  nota_fiscal_fornecedor?: string
  valor_produtos: number
  valor_frete: number
  valor_impostos: number
  valor_total: number
  forma_pagamento?: string
  prazo_pagamento?: number
  status_pagamento: StatusPagamento
  data_vencimento?: string
  data_pagamento?: string
  centro_custo?: string
  projeto?: string
  responsavel_compra?: number
  responsavel?: Usuario
  observacoes?: string
  created_at: string
  itens?: EntradaItem[]
}

export interface EntradaItem {
  id: number
  entrada_id: number
  produto_id?: number
  produto?: Produto
  quantidade: number
  valor_unitario: number
  valor_total: number
  lote?: string
  data_validade?: string
  localizacao_estoque?: string
}

export interface SaidaVenda {
  id: number
  data_venda: string
  orgao_id?: number
  orgao?: OrgaoPublico
  licitacao_id?: number
  licitacao?: Licitacao
  nota_fiscal_emitida?: string
  valor_produtos: number
  valor_frete: number
  valor_desconto: number
  valor_impostos: number
  valor_total: number
  forma_recebimento?: string
  prazo_recebimento?: number
  status_recebimento: StatusRecebimento
  data_vencimento?: string
  data_recebimento?: string
  transportadora?: string
  codigo_rastreio?: string
  tipo_saida: TipoSaida
  destinatario?: string
  responsavel_venda?: number
  responsavel?: Usuario
  observacoes?: string
  created_at: string
  itens?: SaidaItem[]
}

export interface SaidaItem {
  id: number
  saida_id: number
  produto_id?: number
  produto?: Produto
  quantidade: number
  valor_unitario: number
  valor_total: number
  custo_unitario?: number
  custo_total?: number
  lucro_unitario?: number
  lucro_total?: number
  margem_percentual?: number
}

export interface ImpostoCalculado {
  id: number
  documento_tipo: string
  documento_id: number
  tipo_imposto: string
  base_calculo?: number
  aliquota?: number
  valor: number
  regime_tributario?: RegimeTributario
  created_at: string
}

export interface EstoqueMovimentacao {
  id: number
  produto_id?: number
  produto?: Produto
  tipo_movimentacao: TipoMovimentacao
  quantidade: number
  quantidade_anterior?: number
  quantidade_atual?: number
  valor_unitario?: number
  lote?: string
  data_validade?: string
  localizacao_origem?: string
  localizacao_destino?: string
  documento_referencia?: string
  usuario_id?: number
  usuario?: Usuario
  observacoes?: string
  created_at: string
}

// =====================================================
// INTERFACES DE COMPROVANTES FINANCEIROS DETALHADOS
// =====================================================

export interface ComprovantePagamento {
  id: number
  entrada_id: number
  entrada?: EntradaCompra
  data_pagamento: string
  valor_pago: number
  metodo_pagamento: MetodoPagamento
  conta_bancaria?: string
  numero_comprovante?: string
  observacoes?: string
  status: StatusComprovante
  arquivo_url?: string
  created_at: string
}

export interface ComprovanteRecebimento {
  id: number
  saida_id: number
  saida?: SaidaVenda
  data_recebimento: string
  valor_recebido: number
  tipo_recebimento: TipoRecebimento
  banco_origem?: string
  agencia_origem?: string
  numero_ob?: string
  numero_empenho?: string
  numero_liquidacao?: string
  data_liquidacao?: string
  observacoes?: string
  arquivo_url?: string
  // Vinculações
  nota_fiscal_id?: number
  nota_fiscal?: NotaFiscal
  nota_empenho_id?: number
  nota_empenho?: NotaEmpenho
  ordem_fornecimento_id?: number
  ordem_fornecimento?: OrdemFornecimento
  contrato_arp_id?: number
  contrato_arp?: ContratoARP
  recibo_entrega_id?: number
  recibo_entrega?: ReciboEntrega
  created_at: string
}

export interface ReciboEntregaCompleto {
  id: number
  numero: string
  data_entrega: string
  orgao_id?: number
  orgao?: OrgaoPublico
  status: StatusEntregaCompleto
  valor_entrega: number
  responsavel_recebimento: string
  matricula_responsavel?: string
  codigo_rastreamento?: string
  // Fotos durante entrega
  fotos_produtos_embalados: string[]
  fotos_descarga: string[]
  fotos_conferencia: string[]
  foto_assinatura: string[]
  foto_veiculo: string[]
  foto_nota_fiscal: string[]
  foto_canhoto: string[]
  // Documentos após entrega
  recibo_original_url?: string
  termo_conferencia_url?: string
  ata_recebimento_url?: string
  laudo_qualidade_url?: string
  atestado_conformidade_url?: string
  // Rastreamento
  geolocalizacao?: string
  data_hora_exata: string
  created_at: string
}

export interface PastaVirtual {
  id: number
  nome: string
  pasta_pai_id?: number
  pasta_pai?: PastaVirtual
  tipo: TipoPastaVirtual
  caminho: string
  icone: string
  tamanho?: number
  data_modificacao: string
  permissoes: string[]
  tags: string[]
  versao?: number
  compartilhado: boolean
  link_temporario?: string
  validade_link?: string
  usuario_criacao?: number
  usuario?: Usuario
  created_at: string
}

export interface DocumentoVirtual {
  id: number
  nome: string
  pasta_id?: number
  pasta?: PastaVirtual
  tipo_arquivo: string
  tamanho: number
  url: string
  thumbnail_url?: string
  descricao?: string
  tags: string[]
  versao: number
  versao_anterior_id?: number
  compartilhado: boolean
  link_temporario?: string
  validade_link?: string
  senha_acesso?: string
  downloads: number
  visualizacoes: number
  usuario_upload?: number
  usuario?: Usuario
  created_at: string
  updated_at: string
}

export interface HistoricoVersaoDocumento {
  id: number
  documento_id: number
  documento?: DocumentoVirtual
  versao: number
  nome_arquivo: string
  tamanho: number
  url: string
  comentario?: string
  usuario_id?: number
  usuario?: Usuario
  created_at: string
}

export interface LogAcessoDocumento {
  id: number
  documento_id: number
  documento?: DocumentoVirtual
  usuario_id?: number
  usuario?: Usuario
  ip_address: string
  user_agent?: string
  acao: 'visualizar' | 'download' | 'compartilhar'
  created_at: string
}

export interface DashboardFinanceiro {
  totalPagamentos: number
  totalRecebimentos: number
  pagamentosPendentes: number
  recebimentosPendentes: number
  tempoMedioRecebimento: number
  inadimplenciaPorOrgao: {
    orgao: string
    valor: number
    dias: number
  }[]
}

// =====================================================
// INTERFACES DE RELATÓRIOS E DASHBOARDS
// =====================================================

export interface DashboardStats {
  licitacoesAbertas: number
  contratosVigentes: number
  faturamentoMes: number
  margemLucro: number
  alertasPendentes: number
  documentosEmitidos: number
}

export interface RelatorioFiltros {
  dataInicio?: string
  dataFim?: string
  tipoDocumento?: string[]
  orgaoId?: number
  tipoProcesso?: TipoProcesso
  fornecedorId?: number
  categoriaId?: number
  produtoId?: number
  valorMinimo?: number
  valorMaximo?: number
  status?: string
}

export interface ItemRelatorio {
  data: string
  tipoDoc: string
  numero: string
  orgao: string
  categoria: string
  produto: string
  marca: string
  quantidade: number
  unidade: string
  valorUnitario: number
  total: number
  processo: string
  contratoARP: string
  fornecedor: string
  representante: string
  status: string
  icms: number
  pis: number
  cofins: number
  lucro: number
  observacoes: string
}

// =====================================================
// INTERFACES DE CONFIGURAÇÃO E SISTEMA
// =====================================================

export interface ConfiguracaoSistema {
  id: number
  chave: string
  valor: string
  descricao?: string
  tipo: 'string' | 'number' | 'boolean' | 'json'
  categoria: string
  updated_at: string
}

export interface BackupInfo {
  id: number
  nome_arquivo: string
  tamanho_bytes: number
  data_backup: string
  tipo: 'automatico' | 'manual'
  status: 'sucesso' | 'erro' | 'em_andamento'
  observacoes?: string
}

// =====================================================
// INTERFACES DE INTEGRAÇÃO
// =====================================================

export interface IntegracaoSEFAZ {
  ambiente: 'producao' | 'homologacao'
  certificado_path: string
  certificado_senha: string
  uf_emitente: string
  timeout: number
}

export interface ConsultaCNPJ {
  cnpj: string
  razao_social: string
  nome_fantasia?: string
  situacao_cadastral: string
  data_situacao_cadastral: string
  atividade_principal: {
    codigo: string
    descricao: string
  }
  endereco: {
    logradouro: string
    numero: string
    complemento?: string
    bairro: string
    cep: string
    municipio: string
    uf: string
  }
}

// =====================================================
// INTERFACES DE RESPOSTA DA API
// =====================================================

export interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
  errors?: string[]
  pagination?: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export interface PaginatedResponse<T> {
  items: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
}

// =====================================================
// TIPOS UTILITÁRIOS
// =====================================================

export type CreateType<T> = Omit<T, 'id' | 'created_at' | 'updated_at'>
export type UpdateType<T> = Partial<CreateType<T>>

// Tipos para formulários
export type FormErrors<T> = {
  [K in keyof T]?: string
}

export type FormState<T> = {
  data: T
  errors: FormErrors<T>
  loading: boolean
  success: boolean
}

// Tipos para filtros de tabela
export type SortDirection = 'asc' | 'desc'
export type TableSort<T> = {
  field: keyof T
  direction: SortDirection
}

export type TableFilter<T> = {
  field: keyof T
  operator: 'eq' | 'ne' | 'gt' | 'gte' | 'lt' | 'lte' | 'like' | 'in'
  value: any
}

// =====================================================
// CONSTANTES E ENUMS EXPORTADOS
// =====================================================

export const MODALIDADES_LICITACAO: ModalidadeLicitacao[] = [
  'Pregão Eletrônico',
  'Pregão Presencial',
  'Concorrência',
  'Tomada de Preços',
  'Convite',
  'Concurso',
  'Leilão'
]

export const TIPOS_PROCESSO: TipoProcesso[] = [
  'Licitação',
  'Emergencial',
  'Indenizatório',
  'Dispensa',
  'Inexigibilidade'
]

export const STATUS_LICITACAO: StatusLicitacao[] = [
  'Aberta',
  'Em andamento',
  'Encerrada',
  'Cancelada'
]

export const REGIMES_TRIBUTARIOS: RegimeTributario[] = [
  'Simples Nacional',
  'Lucro Presumido',
  'Lucro Real'
]

export const PORTES_EMPRESA: PorteEmpresa[] = [
  'MEI',
  'ME',
  'EPP',
  'Médio',
  'Grande'
]

export const ESFERAS_ORGAO: EsferaOrgao[] = [
  'Municipal',
  'Estadual',
  'Federal'
]

export const METODOS_PAGAMENTO: MetodoPagamento[] = [
  'PIX',
  'Transferência',
  'Boleto',
  'Cartão Crédito',
  'Cartão Débito',
  'Dinheiro',
  'Cheque'
]

export const TIPOS_RECEBIMENTO: TipoRecebimento[] = [
  'PIX',
  'TED/DOC',
  'Ordem Bancária',
  'Depósito',
  'Cheque'
]