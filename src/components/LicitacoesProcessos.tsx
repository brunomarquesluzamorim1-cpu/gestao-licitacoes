'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Progress } from '@/components/ui/progress'
import { 
  ArrowLeft, 
  Plus, 
  Search, 
  Filter,
  FileText,
  Building2,
  Calendar,
  DollarSign,
  Target,
  Clock,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  Package,
  Users,
  MapPin,
  Phone,
  Mail,
  Edit,
  Trash2,
  Upload,
  Download,
  Eye,
  Send,
  Award,
  Gavel,
  AlertCircle
} from 'lucide-react'
import { Licitacao, PropostaComercial, CronogramaEntregas } from '@/lib/types'

interface LicitacoesProcessosProps {
  onVoltar: () => void
}

export default function LicitacoesProcessos({ onVoltar }: LicitacoesProcessosProps) {
  const [visualizacao, setVisualizacao] = useState<'dashboard' | 'ativas' | 'propostas' | 'contratos' | 'nova-licitacao' | 'nova-proposta' | 'detalhes'>('dashboard')
  const [licitacaoSelecionada, setLicitacaoSelecionada] = useState<string | null>(null)
  const [filtroStatus, setFiltroStatus] = useState<string>('todas')
  const [filtroModalidade, setFiltroModalidade] = useState<string>('todas')

  // Dados mockados para demonstração
  const estatisticas = {
    licitacoesAbertas: 12,
    participando: 8,
    vencidas: 3,
    valorPropostas: 2450000,
    taxaSucesso: 37.5,
    contratosVigentes: 5,
    valorContratado: 1850000,
    proximasEntregas: 4
  }

  const licitacoes: Licitacao[] = [
    {
      id: '1',
      status: 'Aberta',
      modalidade: 'Pregão Eletrônico',
      orgaoPublico: 'Prefeitura Municipal de São Paulo',
      numeroEdital: 'PE-001/2024',
      objeto: 'Aquisição de Material de Escritório para Secretarias',
      valorEstimado: 85000,
      dataAbertura: new Date('2024-01-15'),
      dataEncerramento: new Date('2024-02-15'),
      prazoEntregaPropostas: new Date('2024-02-10'),
      situacaoParticipacao: 'Proposta Enviada',
      minhaParticipacao: {
        propostaEnviada: true,
        documentacaoAnexada: ['Certidão CND', 'Balanço Patrimonial'],
        statusHabilitacao: 'Habilitado',
        classificacao: 2,
        valorProposta: 78500,
        resultado: 'Pendente'
      }
    },
    {
      id: '2',
      status: 'Em andamento',
      modalidade: 'Concorrência',
      orgaoPublico: 'Governo do Estado de SP',
      numeroEdital: 'CC-002/2024',
      objeto: 'Fornecimento de Equipamentos de Informática',
      valorEstimado: 320000,
      dataAbertura: new Date('2024-01-10'),
      dataEncerramento: new Date('2024-02-20'),
      prazoEntregaPropostas: new Date('2024-02-18'),
      situacaoParticipacao: 'Habilitado',
      minhaParticipacao: {
        propostaEnviada: true,
        documentacaoAnexada: ['Certidão CND', 'Atestado Capacidade Técnica'],
        statusHabilitacao: 'Habilitado',
        classificacao: 1,
        valorProposta: 295000,
        resultado: 'Pendente'
      }
    },
    {
      id: '3',
      status: 'Encerrada',
      modalidade: 'Pregão Presencial',
      orgaoPublico: 'Ministério da Saúde',
      numeroEdital: 'PP-003/2024',
      objeto: 'Material Médico-Hospitalar',
      valorEstimado: 150000,
      dataAbertura: new Date('2024-01-05'),
      dataEncerramento: new Date('2024-01-25'),
      prazoEntregaPropostas: new Date('2024-01-20'),
      situacaoParticipacao: 'Vencedor',
      minhaParticipacao: {
        propostaEnviada: true,
        documentacaoAnexada: ['Certidão CND', 'Registro Anvisa'],
        statusHabilitacao: 'Habilitado',
        classificacao: 1,
        valorProposta: 142000,
        resultado: 'Vencedor'
      }
    }
  ]

  const contratos = [
    {
      id: '1',
      numero: 'CT-001/2024',
      tipo: 'Contrato',
      licitacaoVinculada: 'PP-003/2024',
      orgao: 'Ministério da Saúde',
      objeto: 'Material Médico-Hospitalar',
      dataAssinatura: new Date('2024-01-30'),
      dataInicio: new Date('2024-02-01'),
      dataFim: new Date('2025-01-31'),
      valorTotal: 142000,
      valorExecutado: 35500,
      saldoDisponivel: 106500,
      status: 'Vigente',
      percentualExecutado: 25
    },
    {
      id: '2',
      numero: 'ARP-002/2024',
      tipo: 'ARP',
      licitacaoVinculada: 'PE-001/2024',
      orgao: 'Prefeitura Municipal de SP',
      objeto: 'Material de Escritório',
      dataAssinatura: new Date('2024-02-20'),
      dataInicio: new Date('2024-03-01'),
      dataFim: new Date('2025-02-28'),
      valorTotal: 78500,
      valorExecutado: 0,
      saldoDisponivel: 78500,
      status: 'Vigente',
      percentualExecutado: 0
    }
  ]

  const licitacoesFiltradas = licitacoes.filter(licitacao => {
    const matchStatus = filtroStatus === 'todas' || licitacao.status.toLowerCase() === filtroStatus
    const matchModalidade = filtroModalidade === 'todas' || licitacao.modalidade.toLowerCase().includes(filtroModalidade)
    return matchStatus && matchModalidade
  })

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Estatísticas Principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Licitações Abertas</CardTitle>
            <FileText className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{estatisticas.licitacoesAbertas}</div>
            <p className="text-xs text-muted-foreground">
              +2 desde ontem
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Participando</CardTitle>
            <Target className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{estatisticas.participando}</div>
            <p className="text-xs text-muted-foreground">
              {((estatisticas.participando / estatisticas.licitacoesAbertas) * 100).toFixed(0)}% das abertas
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Sucesso</CardTitle>
            <Award className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{estatisticas.taxaSucesso}%</div>
            <p className="text-xs text-muted-foreground">
              {estatisticas.vencidas} licitações vencidas
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Valor Contratado</CardTitle>
            <DollarSign className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              R$ {(estatisticas.valorContratado / 1000000).toFixed(1)}M
            </div>
            <p className="text-xs text-muted-foreground">
              {estatisticas.contratosVigentes} contratos vigentes
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Licitações por Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Licitações por Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span>Abertas</span>
                </div>
                <span className="font-bold">12</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span>Em andamento</span>
                </div>
                <span className="font-bold">8</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                  <span>Encerradas</span>
                </div>
                <span className="font-bold">15</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contratos Vigentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {contratos.map((contrato) => (
                <div key={contrato.id} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{contrato.numero}</span>
                    <Badge variant="outline">{contrato.status}</Badge>
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{contrato.orgao}</span>
                    <span>{contrato.percentualExecutado}% executado</span>
                  </div>
                  <Progress value={contrato.percentualExecutado} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Próximas Ações */}
      <Card>
        <CardHeader>
          <CardTitle>Próximas Ações</CardTitle>
          <CardDescription>Prazos e atividades importantes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 border rounded-lg">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              <div className="flex-1">
                <h4 className="font-medium">Prazo para entrega de proposta</h4>
                <p className="text-sm text-muted-foreground">PE-001/2024 - Material de Escritório</p>
              </div>
              <Badge variant="outline">3 dias</Badge>
            </div>
            
            <div className="flex items-center gap-4 p-4 border rounded-lg">
              <Clock className="h-5 w-5 text-blue-500" />
              <div className="flex-1">
                <h4 className="font-medium">Sessão de abertura</h4>
                <p className="text-sm text-muted-foreground">CC-002/2024 - Equipamentos de Informática</p>
              </div>
              <Badge variant="outline">5 dias</Badge>
            </div>
            
            <div className="flex items-center gap-4 p-4 border rounded-lg">
              <Package className="h-5 w-5 text-green-500" />
              <div className="flex-1">
                <h4 className="font-medium">Entrega programada</h4>
                <p className="text-sm text-muted-foreground">CT-001/2024 - Emenda 02</p>
              </div>
              <Badge variant="outline">7 dias</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderAtivas = () => (
    <div className="space-y-6">
      {/* Filtros */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex gap-2">
          <div className="relative flex-1 sm:w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input placeholder="Buscar licitações..." className="pl-10" />
          </div>
          <Select value={filtroStatus} onValueChange={setFiltroStatus}>
            <SelectTrigger className="w-40">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todas">Todas</SelectItem>
              <SelectItem value="aberta">Abertas</SelectItem>
              <SelectItem value="em andamento">Em andamento</SelectItem>
              <SelectItem value="encerrada">Encerradas</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filtroModalidade} onValueChange={setFiltroModalidade}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Modalidade" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todas">Todas</SelectItem>
              <SelectItem value="pregão">Pregão</SelectItem>
              <SelectItem value="concorrência">Concorrência</SelectItem>
              <SelectItem value="tomada">Tomada de Preços</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button onClick={() => setVisualizacao('nova-licitacao')}>
          <Plus className="h-4 w-4 mr-2" />
          Cadastrar Licitação
        </Button>
      </div>

      {/* Lista de Licitações */}
      <div className="space-y-4">
        {licitacoesFiltradas.map((licitacao) => (
          <Card key={licitacao.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold text-lg">{licitacao.numeroEdital}</h3>
                    <Badge 
                      variant={
                        licitacao.status === 'Aberta' ? 'default' :
                        licitacao.status === 'Em andamento' ? 'secondary' : 'outline'
                      }
                    >
                      {licitacao.status}
                    </Badge>
                    {licitacao.minhaParticipacao && (
                      <Badge 
                        variant={
                          licitacao.minhaParticipacao.resultado === 'Vencedor' ? 'default' :
                          licitacao.situacaoParticipacao === 'Proposta Enviada' ? 'secondary' : 'outline'
                        }
                      >
                        {licitacao.situacaoParticipacao}
                      </Badge>
                    )}
                  </div>
                  <h4 className="font-medium">{licitacao.objeto}</h4>
                  <p className="text-sm text-muted-foreground">{licitacao.orgaoPublico}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Gavel className="h-4 w-4" />
                      {licitacao.modalidade}
                    </span>
                    <span className="flex items-center gap-1">
                      <DollarSign className="h-4 w-4" />
                      R$ {licitacao.valorEstimado.toLocaleString('pt-BR')}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {licitacao.dataEncerramento.toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                  {licitacao.minhaParticipacao && (
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-green-600">
                        Minha proposta: R$ {licitacao.minhaParticipacao.valorProposta.toLocaleString('pt-BR')}
                      </span>
                      {licitacao.minhaParticipacao.classificacao && (
                        <span className="text-blue-600">
                          Classificação: {licitacao.minhaParticipacao.classificacao}º lugar
                        </span>
                      )}
                    </div>
                  )}
                </div>
                
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      setLicitacaoSelecionada(licitacao.id)
                      setVisualizacao('detalhes')
                    }}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Ver Detalhes
                  </Button>
                  {licitacao.status === 'Aberta' && !licitacao.minhaParticipacao?.propostaEnviada && (
                    <Button size="sm" onClick={() => setVisualizacao('nova-proposta')}>
                      <Send className="h-4 w-4 mr-2" />
                      Enviar Proposta
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )

  const renderPropostas = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Minhas Propostas</h2>
        <Button onClick={() => setVisualizacao('nova-proposta')}>
          <Plus className="h-4 w-4 mr-2" />
          Nova Proposta
        </Button>
      </div>

      <div className="space-y-4">
        {licitacoes.filter(l => l.minhaParticipacao?.propostaEnviada).map((licitacao) => (
          <Card key={licitacao.id}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{licitacao.numeroEdital}</h3>
                    <Badge 
                      variant={
                        licitacao.minhaParticipacao?.resultado === 'Vencedor' ? 'default' :
                        licitacao.minhaParticipacao?.resultado === 'Pendente' ? 'secondary' : 'destructive'
                      }
                    >
                      {licitacao.minhaParticipacao?.resultado}
                    </Badge>
                  </div>
                  <p className="font-medium">{licitacao.objeto}</p>
                  <p className="text-sm text-muted-foreground">{licitacao.orgaoPublico}</p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Valor Estimado</p>
                      <p className="font-medium">R$ {licitacao.valorEstimado.toLocaleString('pt-BR')}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Minha Proposta</p>
                      <p className="font-medium text-green-600">
                        R$ {licitacao.minhaParticipacao?.valorProposta.toLocaleString('pt-BR')}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Economia</p>
                      <p className="font-medium text-blue-600">
                        {(((licitacao.valorEstimado - (licitacao.minhaParticipacao?.valorProposta || 0)) / licitacao.valorEstimado) * 100).toFixed(1)}%
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Classificação</p>
                      <p className="font-medium">
                        {licitacao.minhaParticipacao?.classificacao}º lugar
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )

  const renderContratos = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Contratos e ARPs</h2>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Novo Contrato
        </Button>
      </div>

      <div className="space-y-4">
        {contratos.map((contrato) => (
          <Card key={contrato.id}>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-lg">{contrato.numero}</h3>
                      <Badge variant="outline">{contrato.tipo}</Badge>
                      <Badge 
                        variant={contrato.status === 'Vigente' ? 'default' : 'secondary'}
                      >
                        {contrato.status}
                      </Badge>
                    </div>
                    <p className="font-medium">{contrato.objeto}</p>
                    <p className="text-sm text-muted-foreground">{contrato.orgao}</p>
                    <p className="text-xs text-muted-foreground">
                      Licitação: {contrato.licitacaoVinculada}
                    </p>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Valor Total</p>
                    <p className="font-bold text-lg">R$ {contrato.valorTotal.toLocaleString('pt-BR')}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Data Assinatura</p>
                    <p className="font-medium">{contrato.dataAssinatura.toLocaleDateString('pt-BR')}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Vigência</p>
                    <p className="font-medium">
                      {contrato.dataInicio.toLocaleDateString('pt-BR')} a {contrato.dataFim.toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Valor Executado</p>
                    <p className="font-medium text-green-600">
                      R$ {contrato.valorExecutado.toLocaleString('pt-BR')}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Saldo Disponível</p>
                    <p className="font-medium text-blue-600">
                      R$ {contrato.saldoDisponivel.toLocaleString('pt-BR')}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Execução do Contrato</span>
                    <span>{contrato.percentualExecutado}%</span>
                  </div>
                  <Progress value={contrato.percentualExecutado} className="h-2" />
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    Ver Detalhes
                  </Button>
                  <Button variant="outline" size="sm">
                    <Package className="h-4 w-4 mr-2" />
                    Emendas
                  </Button>
                  <Button variant="outline" size="sm">
                    <FileText className="h-4 w-4 mr-2" />
                    Documentos
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )

  const renderNovaLicitacao = () => (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={() => setVisualizacao('ativas')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar
        </Button>
        <h2 className="text-2xl font-bold">Cadastrar Nova Licitação</h2>
      </div>

      <Tabs defaultValue="informacoes" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="informacoes">Informações Básicas</TabsTrigger>
          <TabsTrigger value="documentacao">Documentação</TabsTrigger>
          <TabsTrigger value="cronograma">Cronograma</TabsTrigger>
        </TabsList>

        <TabsContent value="informacoes">
          <Card>
            <CardHeader>
              <CardTitle>Dados da Licitação</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="numero-edital">Número do Edital *</Label>
                  <Input id="numero-edital" placeholder="PE-001/2024" />
                </div>
                <div>
                  <Label htmlFor="modalidade">Modalidade *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a modalidade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pregao-eletronico">Pregão Eletrônico</SelectItem>
                      <SelectItem value="pregao-presencial">Pregão Presencial</SelectItem>
                      <SelectItem value="concorrencia">Concorrência</SelectItem>
                      <SelectItem value="tomada-precos">Tomada de Preços</SelectItem>
                      <SelectItem value="convite">Convite</SelectItem>
                      <SelectItem value="dispensa">Dispensa</SelectItem>
                      <SelectItem value="inexigibilidade">Inexigibilidade</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="orgao-publico">Órgão Público *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o órgão" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="prefeitura-sp">Prefeitura Municipal de SP</SelectItem>
                      <SelectItem value="governo-sp">Governo do Estado de SP</SelectItem>
                      <SelectItem value="ministerio-saude">Ministério da Saúde</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="valor-estimado">Valor Estimado *</Label>
                  <Input id="valor-estimado" type="number" step="0.01" placeholder="85000.00" />
                </div>
                <div>
                  <Label htmlFor="data-abertura">Data de Abertura *</Label>
                  <Input id="data-abertura" type="date" />
                </div>
                <div>
                  <Label htmlFor="data-encerramento">Data de Encerramento *</Label>
                  <Input id="data-encerramento" type="date" />
                </div>
                <div>
                  <Label htmlFor="prazo-propostas">Prazo para Propostas *</Label>
                  <Input id="prazo-propostas" type="date" />
                </div>
                <div>
                  <Label htmlFor="status">Status *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="aberta">Aberta</SelectItem>
                      <SelectItem value="em-andamento">Em andamento</SelectItem>
                      <SelectItem value="encerrada">Encerrada</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="objeto">Objeto da Licitação *</Label>
                <Textarea 
                  id="objeto" 
                  placeholder="Descrição detalhada do objeto da licitação..."
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="observacoes">Observações</Label>
                <Textarea 
                  id="observacoes" 
                  placeholder="Observações adicionais..."
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documentacao">
          <Card>
            <CardHeader>
              <CardTitle>Documentação da Licitação</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  'Edital Completo',
                  'Anexos Técnicos',
                  'Planilha de Preços',
                  'Termo de Referência',
                  'Minuta do Contrato',
                  'Documentos de Habilitação'
                ].map((doc) => (
                  <div key={doc} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{doc}</span>
                      <Button size="sm" variant="outline">
                        <Upload className="h-4 w-4 mr-2" />
                        Upload
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">Nenhum arquivo enviado</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cronograma">
          <Card>
            <CardHeader>
              <CardTitle>Cronograma da Licitação</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                {[
                  { evento: 'Publicação do Edital', data: '', responsavel: 'Órgão Público' },
                  { evento: 'Prazo para Impugnações', data: '', responsavel: 'Interessados' },
                  { evento: 'Sessão de Esclarecimentos', data: '', responsavel: 'Órgão Público' },
                  { evento: 'Entrega de Propostas', data: '', responsavel: 'Licitantes' },
                  { evento: 'Abertura das Propostas', data: '', responsavel: 'Órgão Público' },
                  { evento: 'Habilitação', data: '', responsavel: 'Órgão Público' },
                  { evento: 'Resultado Final', data: '', responsavel: 'Órgão Público' }
                ].map((item, index) => (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border rounded-lg">
                    <div>
                      <Label>Evento</Label>
                      <Input value={item.evento} readOnly />
                    </div>
                    <div>
                      <Label>Data/Prazo</Label>
                      <Input type="date" />
                    </div>
                    <div>
                      <Label>Responsável</Label>
                      <Input value={item.responsavel} readOnly />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={() => setVisualizacao('ativas')}>
          Cancelar
        </Button>
        <Button>
          Salvar Licitação
        </Button>
      </div>
    </div>
  )

  const renderNovaProposta = () => (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={() => setVisualizacao('propostas')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar
        </Button>
        <h2 className="text-2xl font-bold">Nova Proposta Comercial</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Seleção da Licitação</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="licitacao-proposta">Licitação *</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a licitação" />
                </SelectTrigger>
                <SelectContent>
                  {licitacoes.filter(l => l.status === 'Aberta').map((licitacao) => (
                    <SelectItem key={licitacao.id} value={licitacao.id}>
                      {licitacao.numeroEdital} - {licitacao.objeto}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Produtos da Proposta</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Produto
          </Button>
          
          <div className="border rounded-lg p-4">
            <p className="text-muted-foreground text-center">
              Nenhum produto adicionado ainda. Use o botão acima para adicionar produtos à proposta.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Condições da Proposta</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="prazo-entrega">Prazo de Entrega (dias) *</Label>
              <Input id="prazo-entrega" type="number" placeholder="30" />
            </div>
            <div>
              <Label htmlFor="validade-proposta">Validade da Proposta (dias) *</Label>
              <Input id="validade-proposta" type="number" placeholder="60" />
            </div>
            <div>
              <Label htmlFor="forma-pagamento-proposta">Forma de Pagamento *</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a forma" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30-dias">30 dias após entrega</SelectItem>
                  <SelectItem value="vista">À vista</SelectItem>
                  <SelectItem value="parcelado">Parcelado</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="garantia">Garantia *</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a garantia" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="12-meses">12 meses</SelectItem>
                  <SelectItem value="24-meses">24 meses</SelectItem>
                  <SelectItem value="fabricante">Garantia do fabricante</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="observacoes-proposta">Observações da Proposta</Label>
            <Textarea 
              id="observacoes-proposta" 
              placeholder="Observações e condições especiais..."
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Resumo Financeiro</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 border rounded-lg">
                <p className="text-sm text-muted-foreground">Custo Total</p>
                <p className="text-xl font-bold text-red-600">R$ 0,00</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <p className="text-sm text-muted-foreground">Impostos</p>
                <p className="text-xl font-bold text-orange-600">R$ 0,00</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <p className="text-sm text-muted-foreground">Valor Proposta</p>
                <p className="text-xl font-bold text-blue-600">R$ 0,00</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <p className="text-sm text-muted-foreground">Lucro Esperado</p>
                <p className="text-xl font-bold text-green-600">R$ 0,00</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={() => setVisualizacao('propostas')}>
          Cancelar
        </Button>
        <Button>
          Salvar Proposta
        </Button>
      </div>
    </div>
  )

  const renderDetalhes = () => {
    const licitacao = licitacoes.find(l => l.id === licitacaoSelecionada)
    if (!licitacao) return null

    return (
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => setVisualizacao('ativas')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
          <div>
            <h2 className="text-2xl font-bold">{licitacao.numeroEdital}</h2>
            <p className="text-muted-foreground">{licitacao.objeto}</p>
          </div>
          <Badge 
            variant={
              licitacao.status === 'Aberta' ? 'default' :
              licitacao.status === 'Em andamento' ? 'secondary' : 'outline'
            }
          >
            {licitacao.status}
          </Badge>
        </div>

        <Tabs defaultValue="informacoes" className="space-y-6">
          <TabsList>
            <TabsTrigger value="informacoes">Informações</TabsTrigger>
            <TabsTrigger value="participacao">Minha Participação</TabsTrigger>
            <TabsTrigger value="cronograma">Cronograma</TabsTrigger>
            <TabsTrigger value="documentos">Documentos</TabsTrigger>
          </TabsList>

          <TabsContent value="informacoes">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Dados da Licitação</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Modalidade:</span>
                    <span>{licitacao.modalidade}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Órgão:</span>
                    <span>{licitacao.orgaoPublico}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Valor Estimado:</span>
                    <span>R$ {licitacao.valorEstimado.toLocaleString('pt-BR')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Data Abertura:</span>
                    <span>{licitacao.dataAbertura.toLocaleDateString('pt-BR')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Data Encerramento:</span>
                    <span>{licitacao.dataEncerramento.toLocaleDateString('pt-BR')}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Status da Participação</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {licitacao.minhaParticipacao ? (
                    <>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Situação:</span>
                        <Badge>{licitacao.situacaoParticipacao}</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Valor Proposta:</span>
                        <span className="font-bold text-green-600">
                          R$ {licitacao.minhaParticipacao.valorProposta.toLocaleString('pt-BR')}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Classificação:</span>
                        <span>{licitacao.minhaParticipacao.classificacao}º lugar</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Resultado:</span>
                        <Badge 
                          variant={
                            licitacao.minhaParticipacao.resultado === 'Vencedor' ? 'default' :
                            licitacao.minhaParticipacao.resultado === 'Pendente' ? 'secondary' : 'destructive'
                          }
                        >
                          {licitacao.minhaParticipacao.resultado}
                        </Badge>
                      </div>
                    </>
                  ) : (
                    <p className="text-muted-foreground">Não participando desta licitação</p>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="participacao">
            <Card>
              <CardHeader>
                <CardTitle>Detalhes da Participação</CardTitle>
              </CardHeader>
              <CardContent>
                {licitacao.minhaParticipacao ? (
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-medium mb-2">Documentação Enviada</h4>
                      <div className="flex flex-wrap gap-2">
                        {licitacao.minhaParticipacao.documentacaoAnexada.map((doc) => (
                          <Badge key={doc} variant="outline">{doc}</Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Status da Habilitação</h4>
                      <Badge variant="default">{licitacao.minhaParticipacao.statusHabilitacao}</Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center p-4 border rounded-lg">
                        <p className="text-sm text-muted-foreground">Valor Estimado</p>
                        <p className="text-lg font-bold">R$ {licitacao.valorEstimado.toLocaleString('pt-BR')}</p>
                      </div>
                      <div className="text-center p-4 border rounded-lg">
                        <p className="text-sm text-muted-foreground">Minha Proposta</p>
                        <p className="text-lg font-bold text-green-600">
                          R$ {licitacao.minhaParticipacao.valorProposta.toLocaleString('pt-BR')}
                        </p>
                      </div>
                      <div className="text-center p-4 border rounded-lg">
                        <p className="text-sm text-muted-foreground">Economia</p>
                        <p className="text-lg font-bold text-blue-600">
                          {(((licitacao.valorEstimado - licitacao.minhaParticipacao.valorProposta) / licitacao.valorEstimado) * 100).toFixed(1)}%
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground mb-4">Você não está participando desta licitação</p>
                    <Button>
                      <Send className="h-4 w-4 mr-2" />
                      Enviar Proposta
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="cronograma">
            <Card>
              <CardHeader>
                <CardTitle>Cronograma da Licitação</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { evento: 'Publicação do Edital', data: licitacao.dataAbertura, status: 'concluido' },
                    { evento: 'Prazo para Impugnações', data: new Date(licitacao.dataAbertura.getTime() + 5 * 24 * 60 * 60 * 1000), status: 'concluido' },
                    { evento: 'Entrega de Propostas', data: licitacao.prazoEntregaPropostas, status: 'pendente' },
                    { evento: 'Abertura das Propostas', data: licitacao.dataEncerramento, status: 'pendente' },
                    { evento: 'Resultado Final', data: new Date(licitacao.dataEncerramento.getTime() + 7 * 24 * 60 * 60 * 1000), status: 'pendente' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 border rounded-lg">
                      <div className={`w-4 h-4 rounded-full ${
                        item.status === 'concluido' ? 'bg-green-500' : 
                        item.status === 'pendente' ? 'bg-yellow-500' : 'bg-gray-300'
                      }`} />
                      <div className="flex-1">
                        <h4 className="font-medium">{item.evento}</h4>
                        <p className="text-sm text-muted-foreground">
                          {item.data.toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                      <Badge variant={item.status === 'concluido' ? 'default' : 'secondary'}>
                        {item.status === 'concluido' ? 'Concluído' : 'Pendente'}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documentos">
            <Card>
              <CardHeader>
                <CardTitle>Documentos da Licitação</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    'Edital Completo',
                    'Anexos Técnicos',
                    'Planilha de Preços',
                    'Termo de Referência',
                    'Minuta do Contrato',
                    'Esclarecimentos'
                  ].map((doc) => (
                    <div key={doc} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-blue-600" />
                        <span className="font-medium">{doc}</span>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    )
  }

  const renderModulo = () => {
    switch (visualizacao) {
      case 'dashboard':
        return renderDashboard()
      case 'ativas':
        return renderAtivas()
      case 'propostas':
        return renderPropostas()
      case 'contratos':
        return renderContratos()
      case 'nova-licitacao':
        return renderNovaLicitacao()
      case 'nova-proposta':
        return renderNovaProposta()
      case 'detalhes':
        return renderDetalhes()
      default:
        return renderDashboard()
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={onVoltar}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar ao Dashboard
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Licitações e Processos</h1>
          <p className="text-muted-foreground">Gestão completa de licitações, propostas e contratos</p>
        </div>
      </div>

      {/* Navegação do módulo */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={visualizacao === 'dashboard' ? 'default' : 'outline'}
          onClick={() => setVisualizacao('dashboard')}
        >
          <Target className="h-4 w-4 mr-2" />
          Dashboard
        </Button>
        <Button
          variant={visualizacao === 'ativas' ? 'default' : 'outline'}
          onClick={() => setVisualizacao('ativas')}
        >
          <FileText className="h-4 w-4 mr-2" />
          Licitações Ativas
        </Button>
        <Button
          variant={visualizacao === 'propostas' ? 'default' : 'outline'}
          onClick={() => setVisualizacao('propostas')}
        >
          <Send className="h-4 w-4 mr-2" />
          Minhas Propostas
        </Button>
        <Button
          variant={visualizacao === 'contratos' ? 'default' : 'outline'}
          onClick={() => setVisualizacao('contratos')}
        >
          <Award className="h-4 w-4 mr-2" />
          Contratos e ARPs
        </Button>
      </div>

      {renderModulo()}
    </div>
  )
}