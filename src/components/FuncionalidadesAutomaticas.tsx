"use client"

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Calculator, 
  TrendingUp, 
  AlertTriangle, 
  Bell, 
  Settings, 
  CheckCircle, 
  Clock, 
  DollarSign,
  Package,
  FileText,
  Zap,
  BarChart3,
  Target,
  Lightbulb,
  Cpu,
  Database,
  Globe
} from 'lucide-react'

interface Produto {
  nome: string
  custoUnitario: number
  margemLucro: number
  impostos: number
  despesasOperacionais: number
}

interface Alerta {
  id: string
  tipo: 'CRÍTICO' | 'ALERTA' | 'INFO'
  titulo: string
  descricao: string
  timestamp: string
  ativo: boolean
}

interface FuncionalidadesAutomaticasProps {
  onClose?: () => void
}

export default function FuncionalidadesAutomaticas({ onClose }: FuncionalidadesAutomaticasProps) {
  const [activeTab, setActiveTab] = useState('calculadora')
  const [produto, setProduto] = useState<Produto>({
    nome: '',
    custoUnitario: 0,
    margemLucro: 20,
    impostos: 8.5,
    despesasOperacionais: 5
  })

  const [alertas, setAlertas] = useState<Alerta[]>([
    {
      id: '1',
      tipo: 'CRÍTICO',
      titulo: 'Cotação Vencida',
      descricao: 'Notebook Dell Inspiron - Cotação vence em 2 dias',
      timestamp: '2024-11-12 14:30',
      ativo: true
    },
    {
      id: '2',
      tipo: 'ALERTA',
      titulo: 'Estoque Baixo',
      descricao: 'Papel A4 - Apenas 15 unidades em estoque',
      timestamp: '2024-11-12 13:15',
      ativo: true
    },
    {
      id: '3',
      tipo: 'INFO',
      titulo: 'Nova Licitação',
      descricao: 'PE-005/2024 - Equipamentos de Escritório',
      timestamp: '2024-11-12 12:00',
      ativo: true
    },
    {
      id: '4',
      tipo: 'CRÍTICO',
      titulo: 'Certidão Vencendo',
      descricao: 'CND Federal vence em 7 dias',
      timestamp: '2024-11-12 11:45',
      ativo: true
    },
    {
      id: '5',
      tipo: 'ALERTA',
      titulo: 'Preço Abaixo do Mínimo',
      descricao: 'Mouse Logitech - Preço 15% abaixo do mínimo',
      timestamp: '2024-11-12 10:20',
      ativo: true
    }
  ])

  const [automacoes, setAutomacoes] = useState({
    calculadoraPrecos: true,
    monitoramentoEstoque: true,
    alertasVencimento: true,
    sincronizacaoPortais: false,
    relatoriosAutomaticos: true,
    backupDados: true
  })

  const [notificacoes, setNotificacoes] = useState({
    email: {
      alertasCriticos: true,
      relatoriosSemanais: true,
      relatoriosMensais: false,
      alertasVencimentos: true,
      propostasVencedoras: true
    },
    sistema: {
      cotacaoVencida: true,
      estoqueMinimo: true,
      precoAbaixoMinimo: true,
      variacaoPreco: false,
      novaLicitacao: true
    }
  })

  const calcularPrecoVenda = () => {
    const custoTotal = produto.custoUnitario * (1 + produto.despesasOperacionais / 100)
    const precoComMargem = custoTotal * (1 + produto.margemLucro / 100)
    const precoFinal = precoComMargem * (1 + produto.impostos / 100)
    return precoFinal
  }

  const calcularLucroLiquido = () => {
    const precoVenda = calcularPrecoVenda()
    const custoTotal = produto.custoUnitario * (1 + produto.despesasOperacionais / 100)
    const impostoValor = precoVenda * (produto.impostos / 100)
    return precoVenda - custoTotal - impostoValor
  }

  const handleAutomacaoChange = (key: string, value: boolean) => {
    setAutomacoes(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const handleNotificacaoChange = (categoria: 'email' | 'sistema', key: string, value: boolean) => {
    setNotificacoes(prev => ({
      ...prev,
      [categoria]: {
        ...prev[categoria],
        [key]: value
      }
    }))
  }

  const toggleAlerta = (id: string) => {
    setAlertas(prev => prev.map(alerta => 
      alerta.id === id ? { ...alerta, ativo: !alerta.ativo } : alerta
    ))
  }

  const getAlertaColor = (tipo: string) => {
    switch (tipo) {
      case 'CRÍTICO': return 'bg-red-100 text-red-800 border-red-200'
      case 'ALERTA': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'INFO': return 'bg-blue-100 text-blue-800 border-blue-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getAlertaIcon = (tipo: string) => {
    switch (tipo) {
      case 'CRÍTICO': return <AlertTriangle className="w-4 h-4" />
      case 'ALERTA': return <Clock className="w-4 h-4" />
      case 'INFO': return <Bell className="w-4 h-4" />
      default: return <Bell className="w-4 h-4" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Funcionalidades Automáticas</h1>
          <p className="text-gray-600">Automações e ferramentas inteligentes do sistema</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge className="bg-green-500">
            <Zap className="w-3 h-3 mr-1" />
            {Object.values(automacoes).filter(Boolean).length} Ativas
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cpu className="w-5 h-5 text-blue-600" />
                Status do Sistema
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">CPU</span>
                  <span className="text-sm font-medium">45%</span>
                </div>
                <Progress value={45} className="h-2" />
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Memória</span>
                  <span className="text-sm font-medium">62%</span>
                </div>
                <Progress value={62} className="h-2" />
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Armazenamento</span>
                  <span className="text-sm font-medium">78%</span>
                </div>
                <Progress value={78} className="h-2" />
              </div>
              <div className="pt-4 border-t">
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-sm font-medium">Sistema Operacional</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-3">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="calculadora" className="flex items-center gap-2">
                <Calculator className="w-4 h-4" />
                Calculadora
              </TabsTrigger>
              <TabsTrigger value="alertas" className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Alertas
              </TabsTrigger>
              <TabsTrigger value="automacoes" className="flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Automações
              </TabsTrigger>
              <TabsTrigger value="notificacoes" className="flex items-center gap-2">
                <Bell className="w-4 h-4" />
                Notificações
              </TabsTrigger>
              <TabsTrigger value="integracao" className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                Integrações
              </TabsTrigger>
            </TabsList>

            <div className="mt-6">
              <TabsContent value="calculadora" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Calculator className="w-5 h-5 text-blue-600" />
                        Calculadora de Preços
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="nome-produto">Nome do Produto</Label>
                        <Input
                          id="nome-produto"
                          value={produto.nome}
                          onChange={(e) => setProduto(prev => ({ ...prev, nome: e.target.value }))}
                          placeholder="Ex: Notebook Dell Inspiron"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="custo-unitario">Custo Unitário (R$)</Label>
                          <Input
                            id="custo-unitario"
                            type="number"
                            value={produto.custoUnitario}
                            onChange={(e) => setProduto(prev => ({ ...prev, custoUnitario: parseFloat(e.target.value) || 0 }))}
                            placeholder="0,00"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="margem-lucro">Margem de Lucro (%)</Label>
                          <Input
                            id="margem-lucro"
                            type="number"
                            value={produto.margemLucro}
                            onChange={(e) => setProduto(prev => ({ ...prev, margemLucro: parseFloat(e.target.value) || 0 }))}
                            placeholder="20"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="impostos">Impostos (%)</Label>
                          <Input
                            id="impostos"
                            type="number"
                            value={produto.impostos}
                            onChange={(e) => setProduto(prev => ({ ...prev, impostos: parseFloat(e.target.value) || 0 }))}
                            placeholder="8,5"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="despesas">Despesas Operacionais (%)</Label>
                          <Input
                            id="despesas"
                            type="number"
                            value={produto.despesasOperacionais}
                            onChange={(e) => setProduto(prev => ({ ...prev, despesasOperacionais: parseFloat(e.target.value) || 0 }))}
                            placeholder="5"
                          />
                        </div>
                      </div>

                      <Button className="w-full">
                        <Calculator className="w-4 h-4 mr-2" />
                        Calcular Preço
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-green-600" />
                        Resultado do Cálculo
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-4">
                        <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                          <span className="font-medium text-blue-900">Preço de Venda:</span>
                          <span className="text-xl font-bold text-blue-600">
                            R$ {calcularPrecoVenda().toFixed(2)}
                          </span>
                        </div>

                        <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                          <span className="font-medium text-green-900">Lucro Líquido:</span>
                          <span className="text-lg font-bold text-green-600">
                            R$ {calcularLucroLiquido().toFixed(2)}
                          </span>
                        </div>

                        <div className="space-y-2">
                          <h4 className="font-medium text-gray-900">Composição do Preço:</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Custo Unitário:</span>
                              <span>R$ {produto.custoUnitario.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Despesas Operacionais ({produto.despesasOperacionais}%):</span>
                              <span>R$ {(produto.custoUnitario * produto.despesasOperacionais / 100).toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Margem de Lucro ({produto.margemLucro}%):</span>
                              <span>R$ {(produto.custoUnitario * (1 + produto.despesasOperacionais / 100) * produto.margemLucro / 100).toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Impostos ({produto.impostos}%):</span>
                              <span>R$ {(calcularPrecoVenda() * produto.impostos / 100).toFixed(2)}</span>
                            </div>
                          </div>
                        </div>

                        <div className="pt-4 border-t">
                          <div className="flex items-center gap-2 text-green-600">
                            <Target className="w-4 h-4" />
                            <span className="text-sm font-medium">
                              Margem Real: {produto.custoUnitario > 0 ? ((calcularLucroLiquido() / calcularPrecoVenda()) * 100).toFixed(1) : 0}%
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="alertas" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-red-600" />
                        Alertas Ativos
                        <Badge className="bg-red-500">{alertas.filter(a => a.ativo).length}</Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {alertas.map((alerta) => (
                          <div key={alerta.id} className={`p-4 rounded-lg border ${getAlertaColor(alerta.tipo)} ${!alerta.ativo ? 'opacity-50' : ''}`}>
                            <div className="flex items-start justify-between">
                              <div className="flex items-start gap-3">
                                {getAlertaIcon(alerta.tipo)}
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className="font-semibold">{alerta.titulo}</span>
                                    <Badge variant="outline" className="text-xs">
                                      {alerta.tipo}
                                    </Badge>
                                  </div>
                                  <p className="text-sm mb-2">{alerta.descricao}</p>
                                  <p className="text-xs text-gray-500">{alerta.timestamp}</p>
                                </div>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => toggleAlerta(alerta.id)}
                                className="ml-2"
                              >
                                {alerta.ativo ? 'Desativar' : 'Ativar'}
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BarChart3 className="w-5 h-5 text-blue-600" />
                        Estatísticas de Alertas
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center p-3 bg-red-50 rounded-lg">
                          <div className="text-2xl font-bold text-red-600">
                            {alertas.filter(a => a.tipo === 'CRÍTICO' && a.ativo).length}
                          </div>
                          <div className="text-sm text-red-800">Críticos</div>
                        </div>
                        <div className="text-center p-3 bg-yellow-50 rounded-lg">
                          <div className="text-2xl font-bold text-yellow-600">
                            {alertas.filter(a => a.tipo === 'ALERTA' && a.ativo).length}
                          </div>
                          <div className="text-sm text-yellow-800">Alertas</div>
                        </div>
                        <div className="text-center p-3 bg-blue-50 rounded-lg">
                          <div className="text-2xl font-bold text-blue-600">
                            {alertas.filter(a => a.tipo === 'INFO' && a.ativo).length}
                          </div>
                          <div className="text-sm text-blue-800">Informativos</div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <h4 className="font-medium text-gray-900">Configurações de Alertas</h4>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div>
                              <p className="font-medium">Alertas por Email</p>
                              <p className="text-sm text-gray-600">Receber alertas críticos por email</p>
                            </div>
                            <input type="checkbox" defaultChecked className="rounded" />
                          </div>
                          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div>
                              <p className="font-medium">Alertas no Sistema</p>
                              <p className="text-sm text-gray-600">Mostrar alertas na interface</p>
                            </div>
                            <input type="checkbox" defaultChecked className="rounded" />
                          </div>
                          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div>
                              <p className="font-medium">Som de Notificação</p>
                              <p className="text-sm text-gray-600">Tocar som para alertas críticos</p>
                            </div>
                            <input type="checkbox" className="rounded" />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="automacoes" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="w-5 h-5 text-purple-600" />
                      Configurações de Automação
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h4 className="font-medium text-gray-900 flex items-center gap-2">
                          <Lightbulb className="w-4 h-4 text-yellow-500" />
                          Automações Inteligentes
                        </h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div>
                              <p className="font-medium">Calculadora de Preços</p>
                              <p className="text-sm text-gray-600">Cálculo automático de preços competitivos</p>
                            </div>
                            <input 
                              type="checkbox" 
                              checked={automacoes.calculadoraPrecos}
                              onChange={(e) => handleAutomacaoChange('calculadoraPrecos', e.target.checked)}
                              className="rounded" 
                            />
                          </div>
                          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div>
                              <p className="font-medium">Monitoramento de Estoque</p>
                              <p className="text-sm text-gray-600">Alertas automáticos de estoque baixo</p>
                            </div>
                            <input 
                              type="checkbox" 
                              checked={automacoes.monitoramentoEstoque}
                              onChange={(e) => handleAutomacaoChange('monitoramentoEstoque', e.target.checked)}
                              className="rounded" 
                            />
                          </div>
                          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div>
                              <p className="font-medium">Alertas de Vencimento</p>
                              <p className="text-sm text-gray-600">Notificações de certidões e contratos</p>
                            </div>
                            <input 
                              type="checkbox" 
                              checked={automacoes.alertasVencimento}
                              onChange={(e) => handleAutomacaoChange('alertasVencimento', e.target.checked)}
                              className="rounded" 
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="font-medium text-gray-900 flex items-center gap-2">
                          <Database className="w-4 h-4 text-blue-500" />
                          Automações de Sistema
                        </h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div>
                              <p className="font-medium">Sincronização com Portais</p>
                              <p className="text-sm text-gray-600">Sync automático com portais de licitação</p>
                            </div>
                            <input 
                              type="checkbox" 
                              checked={automacoes.sincronizacaoPortais}
                              onChange={(e) => handleAutomacaoChange('sincronizacaoPortais', e.target.checked)}
                              className="rounded" 
                            />
                          </div>
                          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div>
                              <p className="font-medium">Relatórios Automáticos</p>
                              <p className="text-sm text-gray-600">Geração automática de relatórios</p>
                            </div>
                            <input 
                              type="checkbox" 
                              checked={automacoes.relatoriosAutomaticos}
                              onChange={(e) => handleAutomacaoChange('relatoriosAutomaticos', e.target.checked)}
                              className="rounded" 
                            />
                          </div>
                          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div>
                              <p className="font-medium">Backup Automático</p>
                              <p className="text-sm text-gray-600">Backup diário dos dados do sistema</p>
                            </div>
                            <input 
                              type="checkbox" 
                              checked={automacoes.backupDados}
                              onChange={(e) => handleAutomacaoChange('backupDados', e.target.checked)}
                              className="rounded" 
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 pt-6 border-t">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900">Status das Automações</h4>
                          <p className="text-sm text-gray-600">
                            {Object.values(automacoes).filter(Boolean).length} de {Object.keys(automacoes).length} automações ativas
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            Pausar Todas
                          </Button>
                          <Button size="sm">
                            Ativar Todas
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="notificacoes" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Bell className="w-5 h-5 text-blue-600" />
                        Notificações por Email
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium">Alertas Críticos</p>
                            <p className="text-sm text-gray-600">Notificações urgentes imediatas</p>
                          </div>
                          <input 
                            type="checkbox" 
                            checked={notificacoes.email.alertasCriticos}
                            onChange={(e) => handleNotificacaoChange('email', 'alertasCriticos', e.target.checked)}
                            className="rounded" 
                          />
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium">Relatórios Semanais</p>
                            <p className="text-sm text-gray-600">Toda segunda-feira às 8h</p>
                          </div>
                          <input 
                            type="checkbox" 
                            checked={notificacoes.email.relatoriosSemanais}
                            onChange={(e) => handleNotificacaoChange('email', 'relatoriosSemanais', e.target.checked)}
                            className="rounded" 
                          />
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium">Relatórios Mensais</p>
                            <p className="text-sm text-gray-600">Todo dia 1º às 9h</p>
                          </div>
                          <input 
                            type="checkbox" 
                            checked={notificacoes.email.relatoriosMensais}
                            onChange={(e) => handleNotificacaoChange('email', 'relatoriosMensais', e.target.checked)}
                            className="rounded" 
                          />
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium">Alertas de Vencimentos</p>
                            <p className="text-sm text-gray-600">Certidões, contratos, etc.</p>
                          </div>
                          <input 
                            type="checkbox" 
                            checked={notificacoes.email.alertasVencimentos}
                            onChange={(e) => handleNotificacaoChange('email', 'alertasVencimentos', e.target.checked)}
                            className="rounded" 
                          />
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium">Propostas Vencedoras</p>
                            <p className="text-sm text-gray-600">Quando ganhar licitação</p>
                          </div>
                          <input 
                            type="checkbox" 
                            checked={notificacoes.email.propostasVencedoras}
                            onChange={(e) => handleNotificacaoChange('email', 'propostasVencedoras', e.target.checked)}
                            className="rounded" 
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Bell className="w-5 h-5 text-purple-600" />
                        Notificações do Sistema
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium">Cotação Vencida</p>
                            <p className="text-sm text-gray-600">Cotações vencidas ou vencendo</p>
                          </div>
                          <input 
                            type="checkbox" 
                            checked={notificacoes.sistema.cotacaoVencida}
                            onChange={(e) => handleNotificacaoChange('sistema', 'cotacaoVencida', e.target.checked)}
                            className="rounded" 
                          />
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium">Estoque Mínimo</p>
                            <p className="text-sm text-gray-600">Produtos com estoque baixo</p>
                          </div>
                          <input 
                            type="checkbox" 
                            checked={notificacoes.sistema.estoqueMinimo}
                            onChange={(e) => handleNotificacaoChange('sistema', 'estoqueMinimo', e.target.checked)}
                            className="rounded" 
                          />
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium">Preço Abaixo do Mínimo</p>
                            <p className="text-sm text-gray-600">Alerta crítico quando preço abaixo do mínimo</p>
                          </div>
                          <input 
                            type="checkbox" 
                            checked={notificacoes.sistema.precoAbaixoMinimo}
                            onChange={(e) => handleNotificacaoChange('sistema', 'precoAbaixoMinimo', e.target.checked)}
                            className="rounded" 
                          />
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium">Variação de Preço</p>
                            <p className="text-sm text-gray-600">Variações bruscas maior que 15%</p>
                          </div>
                          <input 
                            type="checkbox" 
                            checked={notificacoes.sistema.variacaoPreco}
                            onChange={(e) => handleNotificacaoChange('sistema', 'variacaoPreco', e.target.checked)}
                            className="rounded" 
                          />
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium">Nova Licitação</p>
                            <p className="text-sm text-gray-600">Licitações do seu interesse</p>
                          </div>
                          <input 
                            type="checkbox" 
                            checked={notificacoes.sistema.novaLicitacao}
                            onChange={(e) => handleNotificacaoChange('sistema', 'novaLicitacao', e.target.checked)}
                            className="rounded" 
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="integracao" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Globe className="w-5 h-5 text-green-600" />
                      Status das Integrações
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <CheckCircle className="w-6 h-6 text-green-600" />
                          <div>
                            <p className="font-medium">Receita Federal</p>
                            <p className="text-sm text-gray-600">Última consulta: há 15 minutos</p>
                          </div>
                        </div>
                        <Badge className="bg-green-500">Online</Badge>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Clock className="w-6 h-6 text-yellow-600" />
                          <div>
                            <p className="font-medium">Portal de Licitações</p>
                            <p className="text-sm text-gray-600">Configuração pendente</p>
                          </div>
                        </div>
                        <Badge className="bg-yellow-500">Configurando</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  )
}