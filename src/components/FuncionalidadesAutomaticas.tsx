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
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  DollarSign,
  TrendingUp,
  TrendingDown,
  Zap,
  Bell,
  Mail,
  Settings,
  RefreshCw,
  Target,
  Package,
  FileText,
  Calendar,
  Users,
  Building,
  Truck,
  CreditCard,
  BarChart3
} from 'lucide-react'

interface FuncionalidadesAutomaticasProps {
  onClose: () => void
}

interface Produto {
  id: string
  nome: string
  custo: number
  frete: number
  impostos: number
  margemMinima: number
  margemMaxima: number
  custosOperacionais: number
}

interface Alerta {
  id: string
  tipo: 'critico' | 'aviso' | 'info' | 'sucesso'
  categoria: string
  titulo: string
  descricao: string
  data: string
  resolvido: boolean
  prioridade: number
}

export default function FuncionalidadesAutomaticas({ onClose }: FuncionalidadesAutomaticasProps) {
  const [activeTab, setActiveTab] = useState('calculadora')
  const [produto, setProduto] = useState<Produto>({
    id: '1',
    nome: 'Notebook Dell Inspiron 15',
    custo: 2500,
    frete: 150,
    impostos: 23.8,
    margemMinima: 15,
    margemMaxima: 35,
    custosOperacionais: 8.5
  })

  const [alertas, setAlertas] = useState<Alerta[]>([
    {
      id: '1',
      tipo: 'critico',
      categoria: 'Precificação',
      titulo: 'Preço Abaixo do Mínimo',
      descricao: '3 produtos com preço de venda abaixo do mínimo calculado',
      data: '2025-01-10T14:30:00',
      resolvido: false,
      prioridade: 1
    },
    {
      id: '2',
      tipo: 'aviso',
      categoria: 'Cotação',
      titulo: 'Cotações Vencendo',
      descricao: '12 cotações vencem nos próximos 7 dias',
      data: '2025-01-10T09:15:00',
      resolvido: false,
      prioridade: 2
    },
    {
      id: '3',
      tipo: 'critico',
      categoria: 'Estoque',
      titulo: 'Estoque Mínimo',
      descricao: '8 produtos atingiram o estoque mínimo',
      data: '2025-01-10T08:45:00',
      resolvido: false,
      prioridade: 1
    },
    {
      id: '4',
      tipo: 'info',
      categoria: 'Certidões',
      titulo: 'Vencimento Próximo',
      descricao: 'CND Federal vence em 15 dias',
      data: '2025-01-09T16:20:00',
      resolvido: false,
      prioridade: 3
    },
    {
      id: '5',
      tipo: 'aviso',
      categoria: 'Variação',
      titulo: 'Variação de Preço',
      descricao: 'Produto XYZ teve variação de 18% em 30 dias',
      data: '2025-01-09T11:30:00',
      resolvido: false,
      prioridade: 2
    },
    {
      id: '6',
      tipo: 'info',
      categoria: 'Licitação',
      titulo: 'Nova Licitação',
      descricao: 'Pregão 001/2025 - Material de Escritório disponível',
      data: '2025-01-09T10:00:00',
      resolvido: false,
      prioridade: 3
    }
  ])

  const [notificacoes, setNotificacoes] = useState({
    email: {
      relatoriosDiarios: false,
      relatoriosSemanais: true,
      relatoriosMensais: true,
      alertasVencimentos: true,
      propostasVencedoras: true
    },
    sistema: {
      cotacaoVencida: true,
      estoqueMinimo: true,
      precoAbaixoMinimo: true,
      variacaoPreco: true,
      novaLicitacao: false
    }
  })

  // Cálculos automáticos de preços
  const calcularPrecoMinimo = () => {
    const custoTotal = produto.custo + produto.frete
    const percentualTotal = (produto.impostos + produto.margemMinima + produto.custosOperacionais) / 100
    return custoTotal / (1 - percentualTotal)
  }

  const calcularPrecoMaximo = () => {
    const custoTotal = produto.custo + produto.frete
    const percentualTotal = (produto.impostos + produto.margemMaxima + produto.custosOperacionais) / 100
    return custoTotal / (1 - percentualTotal)
  }

  const calcularPrecoSugerido = () => {
    return (calcularPrecoMinimo() + calcularPrecoMaximo()) / 2
  }

  const calcularMargemLucro = (precoVenda: number) => {
    const custoTotal = produto.custo + produto.frete
    const impostos = precoVenda * (produto.impostos / 100)
    return ((precoVenda - custoTotal - impostos) / precoVenda) * 100
  }

  const precoMinimo = calcularPrecoMinimo()
  const precoMaximo = calcularPrecoMaximo()
  const precoSugerido = calcularPrecoSugerido()

  const cenarios = [
    { nome: 'Mínimo', margem: produto.margemMinima, preco: precoMinimo, cor: 'text-red-600' },
    { nome: 'Conservador', margem: produto.margemMinima + 5, preco: precoMinimo * 1.1, cor: 'text-orange-600' },
    { nome: 'Equilibrado', margem: (produto.margemMinima + produto.margemMaxima) / 2, preco: precoSugerido, cor: 'text-blue-600' },
    { nome: 'Agressivo', margem: produto.margemMaxima - 5, preco: precoMaximo * 0.95, cor: 'text-green-600' },
    { nome: 'Máximo', margem: produto.margemMaxima, preco: precoMaximo, cor: 'text-purple-600' }
  ]

  const alertasPorTipo = {
    critico: alertas.filter(a => a.tipo === 'critico' && !a.resolvido).length,
    aviso: alertas.filter(a => a.tipo === 'aviso' && !a.resolvido).length,
    info: alertas.filter(a => a.tipo === 'info' && !a.resolvido).length
  }

  const resolverAlerta = (id: string) => {
    setAlertas(prev => prev.map(alerta => 
      alerta.id === id ? { ...alerta, resolvido: true } : alerta
    ))
  }

  const handleNotificacaoChange = (categoria: 'email' | 'sistema', campo: string, valor: boolean) => {
    setNotificacoes(prev => ({
      ...prev,
      [categoria]: {
        ...prev[categoria],
        [campo]: valor
      }
    }))
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-7xl h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-purple-600 to-blue-600 text-white">
          <div>
            <h2 className="text-2xl font-bold">Funcionalidades Automáticas</h2>
            <p className="text-purple-100">Cálculos, alertas e notificações inteligentes</p>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onClose}
            className="text-white hover:bg-white/20"
          >
            ✕
          </Button>
        </div>

        <div className="flex h-full">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full flex">
            <TabsList className="flex flex-col h-full w-64 bg-gray-50 p-2 space-y-1">
              <TabsTrigger value="calculadora" className="w-full justify-start">
                <Calculator className="w-4 h-4 mr-2" />
                Calculadora de Preços
              </TabsTrigger>
              <TabsTrigger value="alertas" className="w-full justify-start">
                <AlertTriangle className="w-4 h-4 mr-2" />
                Sistema de Alertas
                {(alertasPorTipo.critico + alertasPorTipo.aviso) > 0 && (
                  <Badge variant="destructive" className="ml-auto">
                    {alertasPorTipo.critico + alertasPorTipo.aviso}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="notificacoes" className="w-full justify-start">
                <Bell className="w-4 h-4 mr-2" />
                Notificações
              </TabsTrigger>
              <TabsTrigger value="integracoes" className="w-full justify-start">
                <Zap className="w-4 h-4 mr-2" />
                Integrações
              </TabsTrigger>
            </TabsList>

            <div className="flex-1 overflow-y-auto">
              <TabsContent value="calculadora" className="p-6 space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Calculator className="w-5 h-5 text-blue-600" />
                        Dados do Produto
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label>Nome do Produto</Label>
                        <Input 
                          value={produto.nome}
                          onChange={(e) => setProduto(prev => ({ ...prev, nome: e.target.value }))}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Custo (R$)</Label>
                          <Input 
                            type="number"
                            value={produto.custo}
                            onChange={(e) => setProduto(prev => ({ ...prev, custo: Number(e.target.value) }))}
                          />
                        </div>
                        <div>
                          <Label>Frete (R$)</Label>
                          <Input 
                            type="number"
                            value={produto.frete}
                            onChange={(e) => setProduto(prev => ({ ...prev, frete: Number(e.target.value) }))}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Impostos (%)</Label>
                          <Input 
                            type="number"
                            step="0.1"
                            value={produto.impostos}
                            onChange={(e) => setProduto(prev => ({ ...prev, impostos: Number(e.target.value) }))}
                          />
                        </div>
                        <div>
                          <Label>Custos Operacionais (%)</Label>
                          <Input 
                            type="number"
                            step="0.1"
                            value={produto.custosOperacionais}
                            onChange={(e) => setProduto(prev => ({ ...prev, custosOperacionais: Number(e.target.value) }))}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Margem Mínima (%)</Label>
                          <Input 
                            type="number"
                            step="0.1"
                            value={produto.margemMinima}
                            onChange={(e) => setProduto(prev => ({ ...prev, margemMinima: Number(e.target.value) }))}
                          />
                        </div>
                        <div>
                          <Label>Margem Máxima (%)</Label>
                          <Input 
                            type="number"
                            step="0.1"
                            value={produto.margemMaxima}
                            onChange={(e) => setProduto(prev => ({ ...prev, margemMaxima: Number(e.target.value) }))}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Target className="w-5 h-5 text-green-600" />
                        Cálculos Automáticos
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 gap-4">
                        <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                          <div className="flex justify-between items-center">
                            <span className="font-medium text-red-800">Preço MÍNIMO</span>
                            <span className="text-xl font-bold text-red-600">
                              R$ {precoMinimo.toFixed(2)}
                            </span>
                          </div>
                          <p className="text-sm text-red-600 mt-1">
                            Margem: {produto.margemMinima}% | Lucro: R$ {(precoMinimo - produto.custo - produto.frete - (precoMinimo * produto.impostos / 100)).toFixed(2)}
                          </p>
                        </div>

                        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                          <div className="flex justify-between items-center">
                            <span className="font-medium text-blue-800">Preço SUGERIDO</span>
                            <span className="text-xl font-bold text-blue-600">
                              R$ {precoSugerido.toFixed(2)}
                            </span>
                          </div>
                          <p className="text-sm text-blue-600 mt-1">
                            Margem: {((produto.margemMinima + produto.margemMaxima) / 2).toFixed(1)}% | Lucro: R$ {(precoSugerido - produto.custo - produto.frete - (precoSugerido * produto.impostos / 100)).toFixed(2)}
                          </p>
                        </div>

                        <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                          <div className="flex justify-between items-center">
                            <span className="font-medium text-green-800">Preço MÁXIMO</span>
                            <span className="text-xl font-bold text-green-600">
                              R$ {precoMaximo.toFixed(2)}
                            </span>
                          </div>
                          <p className="text-sm text-green-600 mt-1">
                            Margem: {produto.margemMaxima}% | Lucro: R$ {(precoMaximo - produto.custo - produto.frete - (precoMaximo * produto.impostos / 100)).toFixed(2)}
                          </p>
                        </div>
                      </div>

                      <div className="pt-4 border-t">
                        <h4 className="font-medium mb-2">Composição de Custos</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Custo do Produto:</span>
                            <span>R$ {produto.custo.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Frete:</span>
                            <span>R$ {produto.frete.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Impostos ({produto.impostos}%):</span>
                            <span>R$ {(precoSugerido * produto.impostos / 100).toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Custos Op. ({produto.custosOperacionais}%):</span>
                            <span>R$ {(precoSugerido * produto.custosOperacionais / 100).toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between font-bold border-t pt-2">
                            <span>Custo Total:</span>
                            <span>R$ {(produto.custo + produto.frete + (precoSugerido * (produto.impostos + produto.custosOperacionais) / 100)).toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="w-5 h-5 text-purple-600" />
                      Simulador de Cenários
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                      {cenarios.map((cenario, index) => (
                        <div key={index} className="p-4 bg-gray-50 rounded-lg text-center">
                          <h4 className={`font-bold ${cenario.cor}`}>{cenario.nome}</h4>
                          <div className="mt-2">
                            <p className="text-lg font-bold">R$ {cenario.preco.toFixed(2)}</p>
                            <p className="text-sm text-gray-600">Margem: {cenario.margem.toFixed(1)}%</p>
                            <p className="text-sm text-gray-600">
                              Lucro: R$ {(cenario.preco - produto.custo - produto.frete - (cenario.preco * produto.impostos / 100)).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="alertas" className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <Card className="border-l-4 border-l-red-500">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">Alertas Críticos</p>
                          <p className="text-2xl font-bold text-red-600">{alertasPorTipo.critico}</p>
                        </div>
                        <AlertTriangle className="w-8 h-8 text-red-600" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-l-yellow-500">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">Avisos</p>
                          <p className="text-2xl font-bold text-yellow-600">{alertasPorTipo.aviso}</p>
                        </div>
                        <Clock className="w-8 h-8 text-yellow-600" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-l-blue-500">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">Informações</p>
                          <p className="text-2xl font-bold text-blue-600">{alertasPorTipo.info}</p>
                        </div>
                        <Bell className="w-8 h-8 text-blue-600" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Alertas Ativos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {alertas.filter(a => !a.resolvido).sort((a, b) => a.prioridade - b.prioridade).map((alerta) => (
                        <div 
                          key={alerta.id} 
                          className={`p-4 rounded-lg border-l-4 ${
                            alerta.tipo === 'critico' ? 'border-l-red-500 bg-red-50' :
                            alerta.tipo === 'aviso' ? 'border-l-yellow-500 bg-yellow-50' :
                            'border-l-blue-500 bg-blue-50'
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                {alerta.tipo === 'critico' && <AlertTriangle className="w-5 h-5 text-red-600" />}
                                {alerta.tipo === 'aviso' && <Clock className="w-5 h-5 text-yellow-600" />}
                                {alerta.tipo === 'info' && <Bell className="w-5 h-5 text-blue-600" />}
                                <Badge variant="outline" className="text-xs">
                                  {alerta.categoria}
                                </Badge>
                                <span className="text-xs text-gray-500">
                                  {new Date(alerta.data).toLocaleString('pt-BR')}
                                </span>
                              </div>
                              <h4 className="font-semibold mb-1">{alerta.titulo}</h4>
                              <p className="text-sm text-gray-600">{alerta.descricao}</p>
                            </div>
                            <div className="flex gap-2 ml-4">
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => resolverAlerta(alerta.id)}
                              >
                                Resolver
                              </Button>
                              <Button size="sm" variant="ghost">
                                Detalhes
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Configuração de Alertas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h4 className="font-medium">Alertas de Precificação</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div>
                              <p className="font-medium">Preço abaixo do mínimo</p>
                              <p className="text-sm text-gray-600">Alerta crítico quando preço < mínimo</p>
                            </div>
                            <input type="checkbox" defaultChecked className="rounded" />
                          </div>
                          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div>
                              <p className="font-medium">Variação brusca de preço</p>
                              <p className="text-sm text-gray-600">Variação > 15% em 30 dias</p>
                            </div>
                            <input type="checkbox" defaultChecked className="rounded" />
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <h4 className="font-medium">Alertas de Estoque</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div>
                              <p className="font-medium">Estoque mínimo atingido</p>
                              <p className="text-sm text-gray-600">Quando quantidade ≤ estoque mínimo</p>
                            </div>
                            <input type="checkbox" defaultChecked className="rounded" />
                          </div>
                          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div>
                              <p className="font-medium">Produtos parados</p>
                              <p className="text-sm text-gray-600">Sem movimentação > 90 dias</p>
                            </div>
                            <input type="checkbox" className="rounded" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="notificacoes" className="p-6 space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Mail className="w-5 h-5 text-blue-600" />
                        Notificações por Email
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium">Relatórios Diários</p>
                            <p className="text-sm text-gray-600">Resumo diário às 18h</p>
                          </div>
                          <input 
                            type="checkbox" 
                            checked={notificacoes.email.relatoriosDiarios}
                            onChange={(e) => handleNotificacaoChange('email', 'relatoriosDiarios', e.target.checked)}
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
                            <p className="text-sm text-gray-600">Alerta crítico de precificação</p>
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
                            <p className="text-sm text-gray-600">Variações bruscas > 15%</p>
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
                            <p className="text-sm text-gray-600">Editais disponíveis</p>
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

                <Card>
                  <CardHeader>
                    <CardTitle>Configurações de Email</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <Label>Email Principal</Label>
                          <Input type="email" defaultValue="admin@empresa.com" />
                        </div>
                        <div>
                          <Label>Emails Adicionais</Label>
                          <Input placeholder="email1@empresa.com, email2@empresa.com" />
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <Label>Horário dos Relatórios</Label>
                          <Select defaultValue="18:00">
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="08:00">08:00</SelectItem>
                              <SelectItem value="12:00">12:00</SelectItem>
                              <SelectItem value="18:00">18:00</SelectItem>
                              <SelectItem value="20:00">20:00</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label>Formato dos Relatórios</Label>
                          <Select defaultValue="pdf">
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pdf">PDF</SelectItem>
                              <SelectItem value="excel">Excel</SelectItem>
                              <SelectItem value="ambos">PDF + Excel</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                    <Button className="mt-6">
                      Salvar Configurações
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="integracoes" className="p-6 space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="w-5 h-5 text-green-600" />
                        Emissão de NFe/NFSe
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Status da Integração</span>
                        <Badge className="bg-green-500">Ativa</Badge>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Emissão direta:</span>
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        </div>
                        <div className="flex justify-between">
                          <span>Cálculo automático:</span>
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        </div>
                        <div className="flex justify-between">
                          <span>Envio SEFAZ:</span>
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        </div>
                        <div className="flex justify-between">
                          <span>Email automático:</span>
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="w-full">
                        <Settings className="w-4 h-4 mr-2" />
                        Configurar
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Building className="w-5 h-5 text-blue-600" />
                        Receita Federal
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Status da Integração</span>
                        <Badge className="bg-blue-500">Ativa</Badge>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Validação CNPJ:</span>
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        </div>
                        <div className="flex justify-between">
                          <span>Situação cadastral:</span>
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        </div>
                        <div className="flex justify-between">
                          <span>Verificar certidões:</span>
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="w-full">
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Testar Conexão
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Target className="w-5 h-5 text-purple-600" />
                        Portal de Licitações
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Status da Integração</span>
                        <Badge variant="secondary">Configurando</Badge>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Busca automática:</span>
                          <Clock className="w-4 h-4 text-yellow-600" />
                        </div>
                        <div className="flex justify-between">
                          <span>Alertas de editais:</span>
                          <Clock className="w-4 h-4 text-yellow-600" />
                        </div>
                        <div className="flex justify-between">
                          <span>Filtros por palavra:</span>
                          <Clock className="w-4 h-4 text-yellow-600" />
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="w-full">
                        <Settings className="w-4 h-4 mr-2" />
                        Configurar
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Users className="w-5 h-5 text-orange-600" />
                        SINTEGRA
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Status da Integração</span>
                        <Badge className="bg-orange-500">Ativa</Badge>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Consultar IE:</span>
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        </div>
                        <div className="flex justify-between">
                          <span>Verificar regularidade:</span>
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="w-full">
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Testar Conexão
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <CreditCard className="w-5 h-5 text-green-600" />
                        Sistema Bancário
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Status da Integração</span>
                        <Badge variant="secondary">Disponível</Badge>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Extrato automático:</span>
                          <Clock className="w-4 h-4 text-yellow-600" />
                        </div>
                        <div className="flex justify-between">
                          <span>Conciliação:</span>
                          <Clock className="w-4 h-4 text-yellow-600" />
                        </div>
                        <div className="flex justify-between">
                          <span>PIX automático:</span>
                          <Clock className="w-4 h-4 text-yellow-600" />
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="w-full">
                        <Settings className="w-4 h-4 mr-2" />
                        Configurar
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Truck className="w-5 h-5 text-blue-600" />
                        Transportadoras
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Status da Integração</span>
                        <Badge variant="secondary">Disponível</Badge>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Rastreamento:</span>
                          <Clock className="w-4 h-4 text-yellow-600" />
                        </div>
                        <div className="flex justify-between">
                          <span>Cálculo de frete:</span>
                          <Clock className="w-4 h-4 text-yellow-600" />
                        </div>
                        <div className="flex justify-between">
                          <span>Etiquetas:</span>
                          <Clock className="w-4 h-4 text-yellow-600" />
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="w-full">
                        <Settings className="w-4 h-4 mr-2" />
                        Configurar
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Status das Integrações</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <CheckCircle className="w-6 h-6 text-green-600" />
                          <div>
                            <p className="font-medium">Emissão de NFe</p>
                            <p className="text-sm text-gray-600">Última sincronização: há 2 minutos</p>
                          </div>
                        </div>
                        <Badge className="bg-green-500">Online</Badge>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <CheckCircle className="w-6 h-6 text-blue-600" />
                          <div>
                            <p className="font-medium">Receita Federal</p>
                            <p className="text-sm text-gray-600">Última consulta: há 15 minutos</p>
                          </div>
                        </div>
                        <Badge className="bg-blue-500">Online</Badge>
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