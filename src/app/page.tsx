'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Building2, 
  Users, 
  Package, 
  FileText, 
  DollarSign, 
  BarChart3, 
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp,
  Calendar,
  Download,
  Filter,
  Plus,
  Search,
  Bell,
  Settings,
  LogOut,
  Menu,
  X,
  Receipt
} from 'lucide-react'

// Componentes dos módulos
import CadastroFornecedores from '@/components/CadastroFornecedores'
import ControleFinanceiro from '@/components/ControleFinanceiro'
import LicitacoesProcessos from '@/components/LicitacoesProcessos'
import SistemaUsuarios from '@/components/SistemaUsuarios'
import OrdemFornecimento from '@/components/OrdemFornecimento'
import DocumentosFiscais from '@/components/DocumentosFiscais'
import PainelContador from '@/components/PainelContador'
import ExportacaoRelatorios from '@/components/ExportacaoRelatorios'
import SistemaFiltros from '@/components/SistemaFiltros'
import FuncionalidadesAutomaticas from '@/components/FuncionalidadesAutomaticas'
import ComprovantesFinanceiros from '@/components/ComprovantesFinanceiros'

export default function SistemaERP() {
  const [activeModule, setActiveModule] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [user] = useState({
    name: 'João Silva',
    role: 'Administrador',
    avatar: '/api/placeholder/32/32'
  })

  // Dados do dashboard
  const dashboardStats = {
    licitacoesAbertas: 12,
    contratosVigentes: 8,
    faturamentoMes: 285000,
    margemLucro: 22.5,
    alertasPendentes: 5,
    documentosEmitidos: 34
  }

  const licitacoesRecentes = [
    { id: 'PE-001/2024', orgao: 'Prefeitura Municipal SP', objeto: 'Equipamentos de Informática', valor: 150000, status: 'Aberta', prazo: '5 dias' },
    { id: 'CC-002/2024', orgao: 'Secretaria de Educação SP', objeto: 'Material de Expediente', valor: 85000, status: 'Em andamento', prazo: '10 dias' },
    { id: 'TP-003/2024', orgao: 'Hospital Municipal', objeto: 'Produtos de Limpeza', valor: 45000, status: 'Encerrada', prazo: 'Finalizada' },
    { id: 'PE-004/2024', orgao: 'Universidade Federal SP', objeto: 'Mobiliário Corporativo', valor: 75000, status: 'Vencedora', prazo: 'Contratada' }
  ]

  const alertasRecentes = [
    { tipo: 'CRÍTICO', mensagem: 'Cotação do Notebook Dell vence em 2 dias', modulo: 'Produtos' },
    { tipo: 'ALERTA', mensagem: 'Estoque baixo: Papel A4 (15 unidades)', modulo: 'Estoque' },
    { tipo: 'INFO', mensagem: 'Nova licitação disponível: PE-005/2024', modulo: 'Licitações' },
    { tipo: 'ALERTA', mensagem: 'Prazo de entrega próximo: OF-2024/001234', modulo: 'Entregas' },
    { tipo: 'CRÍTICO', mensagem: 'Certidão CND Federal vence em 7 dias', modulo: 'Documentos' }
  ]

  const proximosEventos = [
    { data: '15/11/2024', evento: 'Abertura PE-001/2024 - Equipamentos TI', tipo: 'licitacao' },
    { data: '18/11/2024', evento: 'Entrega OF-2024/001234 - Hospital Municipal', tipo: 'entrega' },
    { data: '20/11/2024', evento: 'Vencimento Certidão FGTS', tipo: 'documento' },
    { data: '22/11/2024', evento: 'Sessão Pública CC-002/2024', tipo: 'licitacao' },
    { data: '25/11/2024', evento: 'Pagamento Fornecedor ABC Ltda', tipo: 'financeiro' }
  ]

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'licitacoes', label: 'Licitações', icon: FileText },
    { id: 'fornecedores', label: 'Fornecedores', icon: Building2 },
    { id: 'financeiro', label: 'Financeiro', icon: DollarSign },
    { id: 'comprovantes', label: 'Comprovantes', icon: Receipt },
    { id: 'usuarios', label: 'Usuários', icon: Users },
    { id: 'ordem-fornecimento', label: 'Ordem Fornecimento', icon: Package },
    { id: 'documentos-fiscais', label: 'Documentos Fiscais', icon: FileText },
    { id: 'painel-contador', label: 'Painel Contador', icon: BarChart3 },
    { id: 'relatorios', label: 'Relatórios', icon: Download },
    { id: 'filtros', label: 'Consultas', icon: Filter },
    { id: 'automaticas', label: 'Automações', icon: Settings }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Aberta': return 'bg-green-100 text-green-800'
      case 'Em andamento': return 'bg-blue-100 text-blue-800'
      case 'Encerrada': return 'bg-gray-100 text-gray-800'
      case 'Vencedora': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getAlertColor = (tipo: string) => {
    switch (tipo) {
      case 'CRÍTICO': return 'bg-red-100 text-red-800 border-red-200'
      case 'ALERTA': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'INFO': return 'bg-blue-100 text-blue-800 border-blue-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getEventIcon = (tipo: string) => {
    switch (tipo) {
      case 'licitacao': return <FileText className="w-4 h-4 text-blue-600" />
      case 'entrega': return <Package className="w-4 h-4 text-green-600" />
      case 'documento': return <AlertTriangle className="w-4 h-4 text-red-600" />
      case 'financeiro': return <DollarSign className="w-4 h-4 text-purple-600" />
      default: return <Calendar className="w-4 h-4 text-gray-600" />
    }
  }

  const renderModule = () => {
    switch (activeModule) {
      case 'licitacoes':
        return <LicitacoesProcessos />
      case 'fornecedores':
        return <CadastroFornecedores />
      case 'financeiro':
        return <ControleFinanceiro />
      case 'comprovantes':
        return <ComprovantesFinanceiros />
      case 'usuarios':
        return <SistemaUsuarios />
      case 'ordem-fornecimento':
        return <OrdemFornecimento />
      case 'documentos-fiscais':
        return <DocumentosFiscais />
      case 'painel-contador':
        return <PainelContador />
      case 'relatorios':
        return <ExportacaoRelatorios />
      case 'filtros':
        return <SistemaFiltros />
      case 'automaticas':
        return <FuncionalidadesAutomaticas />
      default:
        return renderDashboard()
    }
  }

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Header do Dashboard */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Executivo</h1>
          <p className="text-gray-600">Visão geral do sistema de licitações</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </Button>
          <Button size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Nova Licitação
          </Button>
        </div>
      </div>

      {/* KPIs Principais */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Licitações Abertas</p>
                <p className="text-2xl font-bold text-blue-600">{dashboardStats.licitacoesAbertas}</p>
              </div>
              <FileText className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Contratos Vigentes</p>
                <p className="text-2xl font-bold text-green-600">{dashboardStats.contratosVigentes}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Faturamento Mês</p>
                <p className="text-2xl font-bold text-purple-600">
                  R$ {dashboardStats.faturamentoMes.toLocaleString('pt-BR')}
                </p>
              </div>
              <DollarSign className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Margem de Lucro</p>
                <p className="text-2xl font-bold text-orange-600">{dashboardStats.margemLucro}%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Alertas Pendentes</p>
                <p className="text-2xl font-bold text-red-600">{dashboardStats.alertasPendentes}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Docs Emitidos</p>
                <p className="text-2xl font-bold text-indigo-600">{dashboardStats.documentosEmitidos}</p>
              </div>
              <FileText className="w-8 h-8 text-indigo-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Conteúdo Principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Licitações Recentes */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Licitações Recentes
            </CardTitle>
            <CardDescription>Últimas licitações cadastradas no sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {licitacoesRecentes.map((licitacao) => (
                <div key={licitacao.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-blue-600">{licitacao.id}</span>
                      <Badge className={getStatusColor(licitacao.status)}>
                        {licitacao.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{licitacao.orgao}</p>
                    <p className="text-sm font-medium">{licitacao.objeto}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-green-600">
                      R$ {licitacao.valor.toLocaleString('pt-BR')}
                    </p>
                    <p className="text-sm text-gray-500">{licitacao.prazo}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Alertas e Próximos Eventos */}
        <div className="space-y-6">
          {/* Alertas */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Alertas Recentes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {alertasRecentes.map((alerta, index) => (
                  <div key={index} className={`p-3 rounded-lg border ${getAlertColor(alerta.tipo)}`}>
                    <div className="flex items-start gap-2">
                      <Badge variant="outline" className="text-xs">
                        {alerta.tipo}
                      </Badge>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{alerta.mensagem}</p>
                        <p className="text-xs text-gray-500 mt-1">{alerta.modulo}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Próximos Eventos */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Próximos Eventos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {proximosEventos.map((evento, index) => (
                  <div key={index} className="flex items-start gap-3 p-2 hover:bg-gray-50 rounded">
                    {getEventIcon(evento.tipo)}
                    <div className="flex-1">
                      <p className="text-sm font-medium">{evento.evento}</p>
                      <p className="text-xs text-gray-500">{evento.data}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Gráficos e Análises */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Evolução de Vendas</CardTitle>
            <CardDescription>Faturamento dos últimos 6 meses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center">
                <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Gráfico de evolução de vendas</p>
                <p className="text-sm text-gray-400">Integração com Chart.js</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Composição de Custos</CardTitle>
            <CardDescription>Distribuição dos custos por categoria</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center">
                <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Gráfico de composição de custos</p>
                <p className="text-sm text-gray-400">Gráfico de pizza interativo</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <Building2 className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">ERP Licitações</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveModule(item.id)
                  setSidebarOpen(false)
                }}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  activeModule === item.id
                    ? 'bg-blue-100 text-blue-700 font-medium'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </button>
            )
          })}
        </nav>
      </div>

      {/* Overlay para mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="w-5 h-5" />
              </Button>
              <div className="hidden sm:block">
                <h2 className="text-lg font-semibold text-gray-900">
                  {menuItems.find(item => item.id === activeModule)?.label || 'Dashboard'}
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2">
                <Button variant="ghost" size="sm">
                  <Search className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Bell className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Settings className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-medium text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.role}</p>
                </div>
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <Button variant="ghost" size="sm">
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 lg:p-6">
          {renderModule()}
        </main>
      </div>
    </div>
  )
}