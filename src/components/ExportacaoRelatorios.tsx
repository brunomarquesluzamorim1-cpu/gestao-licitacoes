"use client"

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { 
  Download, 
  FileSpreadsheet, 
  FileText, 
  BarChart3, 
  PieChart, 
  TrendingUp,
  Calendar as CalendarIcon,
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
  Package,
  Users,
  Target,
  Truck,
  FileBarChart,
  Mail,
  Filter,
  Search,
  RefreshCw
} from 'lucide-react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

interface ExportacaoRelatoriosProps {
  onClose: () => void
}

export default function ExportacaoRelatorios({ onClose }: ExportacaoRelatoriosProps) {
  const [activeTab, setActiveTab] = useState('exportacao')
  const [dateRange, setDateRange] = useState<{from?: Date, to?: Date}>({})
  const [selectedOrgao, setSelectedOrgao] = useState('')
  const [selectedCategoria, setSelectedCategoria] = useState('')
  const [isExporting, setIsExporting] = useState(false)

  // Dados simulados para os relatórios
  const kpis = {
    faturamentoMes: 2850000,
    lucroLiquido: 485000,
    margemMedia: 17.2,
    cargaTributaria: 23.8,
    ticketMedio: 45600,
    prazoRecebimento: 28,
    inadimplencia: 2.1,
    taxaSucessoLicitacoes: 68.5
  }

  const dadosVendas = [
    { mes: 'Jan', valor: 2100000, lucro: 350000 },
    { mes: 'Fev', valor: 2300000, lucro: 390000 },
    { mes: 'Mar', valor: 2850000, lucro: 485000 },
    { mes: 'Abr', valor: 2650000, lucro: 450000 },
    { mes: 'Mai', valor: 2950000, lucro: 500000 },
    { mes: 'Jun', valor: 3100000, lucro: 530000 }
  ]

  const categorias = [
    { nome: 'Material de Escritório', valor: 850000, percentual: 29.8 },
    { nome: 'Equipamentos de TI', valor: 650000, percentual: 22.8 },
    { nome: 'Material de Limpeza', valor: 480000, percentual: 16.8 },
    { nome: 'Mobiliário', valor: 420000, percentual: 14.7 },
    { nome: 'Outros', valor: 450000, percentual: 15.9 }
  ]

  const alertas = [
    { tipo: 'critico', titulo: 'Cotação Vencida', descricao: '15 produtos com cotação vencida há mais de 30 dias', quantidade: 15 },
    { tipo: 'aviso', titulo: 'Estoque Baixo', descricao: '8 produtos abaixo do estoque mínimo', quantidade: 8 },
    { tipo: 'info', titulo: 'Certidões Vencendo', descricao: '3 certidões vencem nos próximos 15 dias', quantidade: 3 },
    { tipo: 'sucesso', titulo: 'Entregas em Dia', descricao: '95% das entregas realizadas no prazo', quantidade: 95 }
  ]

  const proximosEventos = [
    { data: '2025-01-15', tipo: 'Licitação', descricao: 'Pregão Eletrônico 001/2025 - Prefeitura Municipal' },
    { data: '2025-01-18', tipo: 'Entrega', descricao: 'Entrega Emenda 003 - Secretaria de Educação' },
    { data: '2025-01-20', tipo: 'Vencimento', descricao: 'CND Federal - Renovação' },
    { data: '2025-01-25', tipo: 'Pagamento', descricao: 'Fornecedor ABC Ltda - R$ 125.000,00' }
  ]

  const handleExportExcel = async () => {
    setIsExporting(true)
    // Simular exportação
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsExporting(false)
    alert('Planilha Excel exportada com sucesso!')
  }

  const handleExportPDF = async () => {
    setIsExporting(true)
    // Simular exportação
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsExporting(false)
    alert('Relatório PDF gerado com sucesso!')
  }

  const handleSendEmail = async () => {
    setIsExporting(true)
    // Simular envio
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsExporting(false)
    alert('Relatório enviado por email!')
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-7xl h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div>
            <h2 className="text-2xl font-bold">Exportação e Relatórios</h2>
            <p className="text-blue-100">Sistema completo de relatórios gerenciais e exportações</p>
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
              <TabsTrigger value="exportacao" className="w-full justify-start">
                <Download className="w-4 h-4 mr-2" />
                Exportação
              </TabsTrigger>
              <TabsTrigger value="relatorios" className="w-full justify-start">
                <FileBarChart className="w-4 h-4 mr-2" />
                Relatórios
              </TabsTrigger>
              <TabsTrigger value="dashboards" className="w-full justify-start">
                <BarChart3 className="w-4 h-4 mr-2" />
                Dashboards
              </TabsTrigger>
              <TabsTrigger value="alertas" className="w-full justify-start">
                <AlertTriangle className="w-4 h-4 mr-2" />
                Alertas
              </TabsTrigger>
              <TabsTrigger value="calendario" className="w-full justify-start">
                <CalendarIcon className="w-4 h-4 mr-2" />
                Calendário
              </TabsTrigger>
            </TabsList>

            <div className="flex-1 overflow-y-auto">
              <TabsContent value="exportacao" className="p-6 space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <FileSpreadsheet className="w-5 h-5 text-green-600" />
                        Planilha Excel Completa
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="text-sm text-gray-600">
                        <p className="font-medium mb-2">Colunas incluídas:</p>
                        <div className="grid grid-cols-2 gap-1 text-xs">
                          <span>• Data</span>
                          <span>• Tipo Doc</span>
                          <span>• Número</span>
                          <span>• Órgão</span>
                          <span>• Categoria</span>
                          <span>• Produto</span>
                          <span>• Marca</span>
                          <span>• Qtd</span>
                          <span>• Unid</span>
                          <span>• Vl.Unit</span>
                          <span>• Total</span>
                          <span>• Processo</span>
                          <span>• Contrato/ARP</span>
                          <span>• Fornecedor</span>
                          <span>• Representante</span>
                          <span>• Status</span>
                          <span>• ICMS</span>
                          <span>• PIS</span>
                          <span>• COFINS</span>
                          <span>• Lucro</span>
                          <span>• Observações</span>
                        </div>
                      </div>
                      <Button 
                        onClick={handleExportExcel} 
                        disabled={isExporting}
                        className="w-full bg-green-600 hover:bg-green-700"
                      >
                        {isExporting ? (
                          <>
                            <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                            Exportando...
                          </>
                        ) : (
                          <>
                            <Download className="w-4 h-4 mr-2" />
                            Exportar Excel
                          </>
                        )}
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Filter className="w-5 h-5 text-blue-600" />
                        Filtros de Exportação
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Período</Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button variant="outline" className="w-full justify-start">
                                <CalendarIcon className="w-4 h-4 mr-2" />
                                {dateRange.from ? (
                                  dateRange.to ? (
                                    `${format(dateRange.from, 'dd/MM/yyyy', { locale: ptBR })} - ${format(dateRange.to, 'dd/MM/yyyy', { locale: ptBR })}`
                                  ) : (
                                    format(dateRange.from, 'dd/MM/yyyy', { locale: ptBR })
                                  )
                                ) : (
                                  'Selecionar período'
                                )}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="range"
                                selected={dateRange}
                                onSelect={setDateRange}
                                numberOfMonths={2}
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                        <div>
                          <Label>Órgão</Label>
                          <Select value={selectedOrgao} onValueChange={setSelectedOrgao}>
                            <SelectTrigger>
                              <SelectValue placeholder="Todos os órgãos" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">Todos os órgãos</SelectItem>
                              <SelectItem value="prefeitura">Prefeitura Municipal</SelectItem>
                              <SelectItem value="secretaria">Secretaria de Educação</SelectItem>
                              <SelectItem value="hospital">Hospital Municipal</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div>
                        <Label>Categoria</Label>
                        <Select value={selectedCategoria} onValueChange={setSelectedCategoria}>
                          <SelectTrigger>
                            <SelectValue placeholder="Todas as categorias" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">Todas as categorias</SelectItem>
                            <SelectItem value="escritorio">Material de Escritório</SelectItem>
                            <SelectItem value="ti">Equipamentos de TI</SelectItem>
                            <SelectItem value="limpeza">Material de Limpeza</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" className="flex-1">
                          <Search className="w-4 h-4 mr-2" />
                          Filtrar
                        </Button>
                        <Button variant="outline">
                          Limpar
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Formatos de Exportação</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Button 
                        onClick={handleExportExcel}
                        disabled={isExporting}
                        className="h-20 flex-col bg-green-600 hover:bg-green-700"
                      >
                        <FileSpreadsheet className="w-8 h-8 mb-2" />
                        Excel (.xlsx)
                      </Button>
                      <Button 
                        onClick={handleExportPDF}
                        disabled={isExporting}
                        className="h-20 flex-col bg-red-600 hover:bg-red-700"
                      >
                        <FileText className="w-8 h-8 mb-2" />
                        PDF
                      </Button>
                      <Button 
                        onClick={handleSendEmail}
                        disabled={isExporting}
                        className="h-20 flex-col bg-blue-600 hover:bg-blue-700"
                      >
                        <Mail className="w-8 h-8 mb-2" />
                        Enviar Email
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="relatorios" className="p-6 space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <PieChart className="w-5 h-5 text-purple-600" />
                        Por Categoria
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {categorias.map((cat, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="flex justify-between text-sm">
                                <span className="font-medium">{cat.nome}</span>
                                <span className="text-gray-600">{cat.percentual}%</span>
                              </div>
                              <Progress value={cat.percentual} className="h-2 mt-1" />
                            </div>
                          </div>
                        ))}
                      </div>
                      <Button variant="outline" size="sm" className="w-full mt-4">
                        <Download className="w-4 h-4 mr-2" />
                        Exportar Relatório
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Package className="w-5 h-5 text-orange-600" />
                        Estoque
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                          <div>
                            <p className="font-medium text-red-800">Em Falta</p>
                            <p className="text-sm text-red-600">12 produtos</p>
                          </div>
                          <Badge variant="destructive">12</Badge>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                          <div>
                            <p className="font-medium text-yellow-800">Estoque Baixo</p>
                            <p className="text-sm text-yellow-600">8 produtos</p>
                          </div>
                          <Badge className="bg-yellow-500">8</Badge>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium text-gray-800">Parados</p>
                            <p className="text-sm text-gray-600">5 produtos</p>
                          </div>
                          <Badge variant="secondary">5</Badge>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                          <div>
                            <p className="font-medium text-blue-800">Valor Total</p>
                            <p className="text-sm text-blue-600">R$ 1.850.000</p>
                          </div>
                          <Badge className="bg-blue-500">Total</Badge>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="w-full mt-4">
                        <Download className="w-4 h-4 mr-2" />
                        Relatório Completo
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Target className="w-5 h-5 text-green-600" />
                        Licitações
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="text-center">
                          <div className="text-3xl font-bold text-green-600">68.5%</div>
                          <p className="text-sm text-gray-600">Taxa de Vitória</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-center">
                          <div>
                            <div className="text-xl font-bold text-blue-600">47</div>
                            <p className="text-xs text-gray-600">Vencidas</p>
                          </div>
                          <div>
                            <div className="text-xl font-bold text-gray-600">21</div>
                            <p className="text-xs text-gray-600">Perdidas</p>
                          </div>
                        </div>
                        <div className="text-center p-3 bg-green-50 rounded-lg">
                          <p className="font-medium text-green-800">Valor Contratado</p>
                          <p className="text-lg font-bold text-green-600">R$ 12.850.000</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="w-full mt-4">
                        <Download className="w-4 h-4 mr-2" />
                        Análise Completa
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Truck className="w-5 h-5 text-blue-600" />
                        Entregas
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="text-center">
                          <div className="text-3xl font-bold text-blue-600">95%</div>
                          <p className="text-sm text-gray-600">Pontualidade</p>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm">No Prazo</span>
                            <span className="text-sm font-medium text-green-600">142</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Atrasadas</span>
                            <span className="text-sm font-medium text-red-600">8</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Em Execução</span>
                            <span className="text-sm font-medium text-blue-600">23</span>
                          </div>
                        </div>
                        <div className="text-center p-3 bg-blue-50 rounded-lg">
                          <p className="font-medium text-blue-800">Próximas 7 dias</p>
                          <p className="text-lg font-bold text-blue-600">12 entregas</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="w-full mt-4">
                        <Download className="w-4 h-4 mr-2" />
                        Cronograma
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="lg:col-span-2">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <FileBarChart className="w-5 h-5 text-purple-600" />
                        DRE - Demonstração do Resultado
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                          <span className="font-medium">Receita Bruta</span>
                          <span className="font-bold text-green-600">R$ 3.100.000</span>
                        </div>
                        <div className="flex justify-between items-center p-2 pl-6">
                          <span className="text-sm text-gray-600">(-) Deduções/Impostos</span>
                          <span className="text-sm text-red-600">R$ 738.000</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                          <span className="font-medium">Receita Líquida</span>
                          <span className="font-bold text-blue-600">R$ 2.362.000</span>
                        </div>
                        <div className="flex justify-between items-center p-2 pl-6">
                          <span className="text-sm text-gray-600">(-) CMV</span>
                          <span className="text-sm text-red-600">R$ 1.550.000</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                          <span className="font-medium">Lucro Bruto</span>
                          <span className="font-bold text-yellow-600">R$ 812.000</span>
                        </div>
                        <div className="flex justify-between items-center p-2 pl-6">
                          <span className="text-sm text-gray-600">(-) Despesas Operacionais</span>
                          <span className="text-sm text-red-600">R$ 327.000</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg border-2 border-purple-200">
                          <span className="font-bold">Lucro Líquido</span>
                          <span className="font-bold text-purple-600 text-lg">R$ 485.000</span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="w-full mt-4">
                        <Download className="w-4 h-4 mr-2" />
                        Exportar DRE Completo
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="dashboards" className="p-6 space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">Faturamento do Mês</p>
                          <p className="text-2xl font-bold text-green-600">
                            R$ {kpis.faturamentoMes.toLocaleString('pt-BR')}
                          </p>
                        </div>
                        <DollarSign className="w-8 h-8 text-green-600" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">Lucro Líquido</p>
                          <p className="text-2xl font-bold text-blue-600">
                            R$ {kpis.lucroLiquido.toLocaleString('pt-BR')}
                          </p>
                        </div>
                        <TrendingUp className="w-8 h-8 text-blue-600" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">Margem Média</p>
                          <p className="text-2xl font-bold text-purple-600">{kpis.margemMedia}%</p>
                        </div>
                        <BarChart3 className="w-8 h-8 text-purple-600" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">Taxa Sucesso</p>
                          <p className="text-2xl font-bold text-orange-600">{kpis.taxaSucessoLicitacoes}%</p>
                        </div>
                        <Target className="w-8 h-8 text-orange-600" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Evolução de Vendas</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64 flex items-end justify-between gap-2">
                        {dadosVendas.map((item, index) => (
                          <div key={index} className="flex-1 flex flex-col items-center">
                            <div 
                              className="w-full bg-blue-500 rounded-t"
                              style={{ height: `${(item.valor / 3100000) * 200}px` }}
                            ></div>
                            <span className="text-xs mt-2">{item.mes}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Composição por Categoria</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {categorias.map((cat, index) => (
                          <div key={index} className="flex items-center gap-3">
                            <div 
                              className="w-4 h-4 rounded"
                              style={{ backgroundColor: `hsl(${index * 60}, 70%, 50%)` }}
                            ></div>
                            <div className="flex-1">
                              <div className="flex justify-between">
                                <span className="text-sm font-medium">{cat.nome}</span>
                                <span className="text-sm text-gray-600">{cat.percentual}%</span>
                              </div>
                              <Progress value={cat.percentual} className="h-2" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="p-4 text-center">
                      <p className="text-sm text-gray-600">Carga Tributária</p>
                      <p className="text-xl font-bold text-red-600">{kpis.cargaTributaria}%</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <p className="text-sm text-gray-600">Ticket Médio</p>
                      <p className="text-xl font-bold text-green-600">R$ {kpis.ticketMedio.toLocaleString('pt-BR')}</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <p className="text-sm text-gray-600">Prazo Recebimento</p>
                      <p className="text-xl font-bold text-blue-600">{kpis.prazoRecebimento} dias</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <p className="text-sm text-gray-600">Inadimplência</p>
                      <p className="text-xl font-bold text-orange-600">{kpis.inadimplencia}%</p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="alertas" className="p-6 space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {alertas.map((alerta, index) => (
                    <Card key={index} className={`border-l-4 ${
                      alerta.tipo === 'critico' ? 'border-l-red-500 bg-red-50' :
                      alerta.tipo === 'aviso' ? 'border-l-yellow-500 bg-yellow-50' :
                      alerta.tipo === 'info' ? 'border-l-blue-500 bg-blue-50' :
                      'border-l-green-500 bg-green-50'
                    }`}>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              {alerta.tipo === 'critico' && <AlertTriangle className="w-5 h-5 text-red-600" />}
                              {alerta.tipo === 'aviso' && <Clock className="w-5 h-5 text-yellow-600" />}
                              {alerta.tipo === 'info' && <AlertTriangle className="w-5 h-5 text-blue-600" />}
                              {alerta.tipo === 'sucesso' && <CheckCircle className="w-5 h-5 text-green-600" />}
                              <h3 className="font-semibold">{alerta.titulo}</h3>
                            </div>
                            <p className="text-sm text-gray-600">{alerta.descricao}</p>
                          </div>
                          <Badge 
                            variant={alerta.tipo === 'critico' ? 'destructive' : 'secondary'}
                            className="ml-2"
                          >
                            {alerta.quantidade}
                          </Badge>
                        </div>
                        <div className="mt-4 flex gap-2">
                          <Button size="sm" variant="outline">
                            Ver Detalhes
                          </Button>
                          {alerta.tipo === 'critico' && (
                            <Button size="sm" className="bg-red-600 hover:bg-red-700">
                              Resolver
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Configurar Notificações</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h4 className="font-medium">Alertas por Email</h4>
                        <div className="space-y-2">
                          <label className="flex items-center space-x-2">
                            <input type="checkbox" defaultChecked className="rounded" />
                            <span className="text-sm">Cotação vencida (7 dias)</span>
                          </label>
                          <label className="flex items-center space-x-2">
                            <input type="checkbox" defaultChecked className="rounded" />
                            <span className="text-sm">Estoque mínimo atingido</span>
                          </label>
                          <label className="flex items-center space-x-2">
                            <input type="checkbox" defaultChecked className="rounded" />
                            <span className="text-sm">Vencimento certidões</span>
                          </label>
                          <label className="flex items-center space-x-2">
                            <input type="checkbox" className="rounded" />
                            <span className="text-sm">Nova licitação disponível</span>
                          </label>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <h4 className="font-medium">Relatórios Agendados</h4>
                        <div className="space-y-2">
                          <label className="flex items-center space-x-2">
                            <input type="checkbox" className="rounded" />
                            <span className="text-sm">Relatório diário</span>
                          </label>
                          <label className="flex items-center space-x-2">
                            <input type="checkbox" defaultChecked className="rounded" />
                            <span className="text-sm">Relatório semanal</span>
                          </label>
                          <label className="flex items-center space-x-2">
                            <input type="checkbox" defaultChecked className="rounded" />
                            <span className="text-sm">Relatório mensal</span>
                          </label>
                        </div>
                      </div>
                    </div>
                    <Button className="mt-6">
                      Salvar Configurações
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="calendario" className="p-6 space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <Card>
                      <CardHeader>
                        <CardTitle>Calendário de Eventos</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Calendar
                          mode="single"
                          className="rounded-md border w-full"
                        />
                      </CardContent>
                    </Card>
                  </div>

                  <div className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Próximos Eventos</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {proximosEventos.map((evento, index) => (
                            <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                              <div className={`w-3 h-3 rounded-full mt-1 ${
                                evento.tipo === 'Licitação' ? 'bg-blue-500' :
                                evento.tipo === 'Entrega' ? 'bg-green-500' :
                                evento.tipo === 'Vencimento' ? 'bg-red-500' :
                                'bg-yellow-500'
                              }`}></div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <Badge variant="outline" className="text-xs">
                                    {evento.tipo}
                                  </Badge>
                                  <span className="text-xs text-gray-500">
                                    {format(new Date(evento.data), 'dd/MM/yyyy', { locale: ptBR })}
                                  </span>
                                </div>
                                <p className="text-sm">{evento.descricao}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Resumo do Mês</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-sm">Licitações</span>
                            <Badge className="bg-blue-500">8</Badge>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Entregas</span>
                            <Badge className="bg-green-500">12</Badge>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Vencimentos</span>
                            <Badge className="bg-red-500">3</Badge>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Pagamentos</span>
                            <Badge className="bg-yellow-500">15</Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  )
}