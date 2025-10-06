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
import { 
  ArrowLeft, 
  Plus, 
  Search, 
  Filter,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Calendar,
  FileText,
  CreditCard,
  Banknote,
  PieChart,
  BarChart3,
  Receipt,
  ShoppingCart,
  Package,
  AlertCircle,
  CheckCircle,
  Clock,
  Edit,
  Trash2,
  Download,
  Upload
} from 'lucide-react'
import { MovimentacaoFinanceira, Compra, Venda, CalculoLucro } from '@/lib/types'

interface ControleFinanceiroProps {
  onVoltar: () => void
}

export default function ControleFinanceiro({ onVoltar }: ControleFinanceiroProps) {
  const [visualizacao, setVisualizacao] = useState<'dashboard' | 'entradas' | 'saidas' | 'lucro' | 'impostos' | 'nova-entrada' | 'nova-saida'>('dashboard')
  const [filtroTipo, setFiltroTipo] = useState<string>('todos')
  const [filtroPeriodo, setFiltroPeriodo] = useState<string>('mes-atual')

  // Dados mockados para demonstração
  const resumoFinanceiro = {
    receitaMensal: 180000,
    despesaMensal: 120000,
    lucroMensal: 60000,
    margemLucro: 33.3,
    contasReceber: 45000,
    contasPagar: 28000,
    saldoCaixa: 85000,
    impostosMes: 25000
  }

  const movimentacoes: MovimentacaoFinanceira[] = [
    {
      id: '1',
      tipo: 'Entrada',
      data: new Date('2024-01-25'),
      valor: 15000,
      descricao: 'Venda - Licitação LP001/2024',
      categoria: 'Vendas',
      fornecedorCliente: 'Prefeitura Municipal',
      numeroNF: 'NF-001',
      formaPagamento: 'Boleto',
      status: 'Recebido',
      licitacaoVinculada: 'LP001/2024'
    },
    {
      id: '2',
      tipo: 'Saída',
      data: new Date('2024-01-24'),
      valor: 8500,
      descricao: 'Compra de Material de Escritório',
      categoria: 'Compras',
      fornecedorCliente: 'ABC Distribuidora',
      numeroNF: 'NF-12345',
      formaPagamento: 'PIX',
      status: 'Pago'
    },
    {
      id: '3',
      tipo: 'Entrada',
      data: new Date('2024-01-23'),
      valor: 32000,
      descricao: 'Venda - Equipamentos de Informática',
      categoria: 'Vendas',
      fornecedorCliente: 'Governo do Estado',
      numeroNF: 'NF-002',
      formaPagamento: 'Transferência',
      status: 'Pendente'
    }
  ]

  const calculosLucro: CalculoLucro[] = [
    {
      receitaBruta: 15000,
      impostosVenda: 2250,
      custoProdutoVendido: 8000,
      fretePago: 300,
      lucroBruto: 4450,
      despesasOperacionais: 1200,
      comissoes: 750,
      lucroLiquido: 2500,
      margemLucro: 16.7
    }
  ]

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receita Mensal</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              R$ {(resumoFinanceiro.receitaMensal / 1000).toFixed(0)}K
            </div>
            <p className="text-xs text-muted-foreground">
              +12% em relação ao mês anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Despesas Mensais</CardTitle>
            <TrendingDown className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              R$ {(resumoFinanceiro.despesaMensal / 1000).toFixed(0)}K
            </div>
            <p className="text-xs text-muted-foreground">
              +5% em relação ao mês anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lucro Líquido</CardTitle>
            <DollarSign className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              R$ {(resumoFinanceiro.lucroMensal / 1000).toFixed(0)}K
            </div>
            <p className="text-xs text-muted-foreground">
              Margem de {resumoFinanceiro.margemLucro.toFixed(1)}%
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saldo em Caixa</CardTitle>
            <Banknote className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              R$ {(resumoFinanceiro.saldoCaixa / 1000).toFixed(0)}K
            </div>
            <p className="text-xs text-muted-foreground">
              Posição atual
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Contas a Receber e Pagar */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Receipt className="h-5 w-5 text-green-600" />
              Contas a Receber
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600 mb-4">
              R$ {(resumoFinanceiro.contasReceber / 1000).toFixed(0)}K
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Vencidas</span>
                <span className="text-red-600">R$ 5.000</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Próximos 7 dias</span>
                <span className="text-orange-600">R$ 15.000</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Próximos 30 dias</span>
                <span className="text-blue-600">R$ 25.000</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-red-600" />
              Contas a Pagar
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600 mb-4">
              R$ {(resumoFinanceiro.contasPagar / 1000).toFixed(0)}K
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Vencidas</span>
                <span className="text-red-600">R$ 2.000</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Próximos 7 dias</span>
                <span className="text-orange-600">R$ 8.000</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Próximos 30 dias</span>
                <span className="text-blue-600">R$ 18.000</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Movimentações Recentes */}
      <Card>
        <CardHeader>
          <CardTitle>Movimentações Recentes</CardTitle>
          <CardDescription>Últimas entradas e saídas registradas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {movimentacoes.slice(0, 5).map((mov) => (
              <div key={mov.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-full ${
                    mov.tipo === 'Entrada' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                  }`}>
                    {mov.tipo === 'Entrada' ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                  </div>
                  <div>
                    <h4 className="font-medium">{mov.descricao}</h4>
                    <p className="text-sm text-muted-foreground">
                      {mov.fornecedorCliente} • {mov.data.toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-bold ${
                    mov.tipo === 'Entrada' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {mov.tipo === 'Entrada' ? '+' : '-'} R$ {mov.valor.toLocaleString('pt-BR')}
                  </p>
                  <Badge 
                    variant={
                      mov.status === 'Recebido' || mov.status === 'Pago' ? 'default' :
                      mov.status === 'Pendente' ? 'secondary' : 'destructive'
                    }
                  >
                    {mov.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderEntradas = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex gap-2">
          <div className="relative flex-1 sm:w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input placeholder="Buscar entradas..." className="pl-10" />
          </div>
          <Select value={filtroPeriodo} onValueChange={setFiltroPeriodo}>
            <SelectTrigger className="w-40">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mes-atual">Mês Atual</SelectItem>
              <SelectItem value="mes-anterior">Mês Anterior</SelectItem>
              <SelectItem value="trimestre">Trimestre</SelectItem>
              <SelectItem value="ano">Ano</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button onClick={() => setVisualizacao('nova-entrada')}>
          <Plus className="h-4 w-4 mr-2" />
          Nova Entrada
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Entradas (Vendas/Receitas)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {movimentacoes.filter(m => m.tipo === 'Entrada').map((entrada) => (
              <div key={entrada.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <h4 className="font-medium">{entrada.descricao}</h4>
                  <p className="text-sm text-muted-foreground">
                    {entrada.fornecedorCliente} • NF: {entrada.numeroNF}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>{entrada.data.toLocaleDateString('pt-BR')}</span>
                    <span>{entrada.formaPagamento}</span>
                    {entrada.licitacaoVinculada && (
                      <span>Licitação: {entrada.licitacaoVinculada}</span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-bold text-green-600">
                      R$ {entrada.valor.toLocaleString('pt-BR')}
                    </p>
                    <Badge 
                      variant={entrada.status === 'Recebido' ? 'default' : 'secondary'}
                    >
                      {entrada.status}
                    </Badge>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <FileText className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderSaidas = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex gap-2">
          <div className="relative flex-1 sm:w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input placeholder="Buscar saídas..." className="pl-10" />
          </div>
          <Select value={filtroPeriodo} onValueChange={setFiltroPeriodo}>
            <SelectTrigger className="w-40">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mes-atual">Mês Atual</SelectItem>
              <SelectItem value="mes-anterior">Mês Anterior</SelectItem>
              <SelectItem value="trimestre">Trimestre</SelectItem>
              <SelectItem value="ano">Ano</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button onClick={() => setVisualizacao('nova-saida')}>
          <Plus className="h-4 w-4 mr-2" />
          Nova Saída
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Saídas (Compras/Despesas)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {movimentacoes.filter(m => m.tipo === 'Saída').map((saida) => (
              <div key={saida.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <h4 className="font-medium">{saida.descricao}</h4>
                  <p className="text-sm text-muted-foreground">
                    {saida.fornecedorCliente} • NF: {saida.numeroNF}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>{saida.data.toLocaleDateString('pt-BR')}</span>
                    <span>{saida.formaPagamento}</span>
                    <span>Categoria: {saida.categoria}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-bold text-red-600">
                      R$ {saida.valor.toLocaleString('pt-BR')}
                    </p>
                    <Badge 
                      variant={saida.status === 'Pago' ? 'default' : 'secondary'}
                    >
                      {saida.status}
                    </Badge>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <FileText className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderLucro = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Análise de Lucro</CardTitle>
          <CardDescription>Demonstração detalhada do resultado</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* DRE Simplificado */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">DRE - Demonstração do Resultado</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-green-50 rounded">
                  <span className="font-medium">Receita Bruta</span>
                  <span className="font-bold text-green-600">R$ 180.000,00</span>
                </div>
                
                <div className="pl-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>(-) Impostos sobre Vendas</span>
                    <span className="text-red-600">R$ 25.000,00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>(-) Devoluções</span>
                    <span className="text-red-600">R$ 2.000,00</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
                  <span className="font-medium">Receita Líquida</span>
                  <span className="font-bold text-blue-600">R$ 153.000,00</span>
                </div>
                
                <div className="pl-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>(-) CMV (Custo Mercadoria Vendida)</span>
                    <span className="text-red-600">R$ 90.000,00</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-purple-50 rounded">
                  <span className="font-medium">Lucro Bruto</span>
                  <span className="font-bold text-purple-600">R$ 63.000,00</span>
                </div>
                
                <div className="pl-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>(-) Despesas Operacionais</span>
                    <span className="text-red-600">R$ 15.000,00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>(-) Despesas Administrativas</span>
                    <span className="text-red-600">R$ 8.000,00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>(-) Comissões</span>
                    <span className="text-red-600">R$ 5.000,00</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-orange-50 rounded border-2 border-orange-200">
                  <span className="font-bold">Lucro Líquido</span>
                  <span className="font-bold text-orange-600 text-xl">R$ 35.000,00</span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span className="font-medium">Margem de Lucro</span>
                  <span className="font-bold text-gray-600">19.4%</span>
                </div>
              </div>
            </div>

            <Separator />

            {/* Análise por Produto/Licitação */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Lucro por Licitação</h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Licitação LP001/2024</h4>
                    <p className="text-sm text-muted-foreground">Material de Escritório</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">R$ 12.500,00</p>
                    <p className="text-sm text-muted-foreground">Margem: 25%</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Licitação LP002/2024</h4>
                    <p className="text-sm text-muted-foreground">Equipamentos de Informática</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">R$ 22.500,00</p>
                    <p className="text-sm text-muted-foreground">Margem: 18%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderImpostos = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Impostos do Mês</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              R$ {(resumoFinanceiro.impostosMes / 1000).toFixed(0)}K
            </div>
            <p className="text-xs text-muted-foreground">
              13.9% da receita bruta
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Regime Tributário</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">Simples Nacional</div>
            <p className="text-xs text-muted-foreground">
              Anexo I - Comércio
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Próximo Vencimento</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold text-orange-600">20/02/2024</div>
            <p className="text-xs text-muted-foreground">
              DAS - R$ 8.500,00
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Detalhamento de Impostos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { nome: 'ICMS', valor: 8500, aliquota: 4.7, vencimento: '20/02/2024' },
              { nome: 'PIS', valor: 1200, aliquota: 0.65, vencimento: '20/02/2024' },
              { nome: 'COFINS', valor: 5500, aliquota: 3.0, vencimento: '20/02/2024' },
              { nome: 'IRPJ', valor: 3200, aliquota: 1.8, vencimento: '20/02/2024' },
              { nome: 'CSLL', valor: 1800, aliquota: 1.0, vencimento: '20/02/2024' },
              { nome: 'ISS', valor: 4800, aliquota: 2.65, vencimento: '15/02/2024' }
            ].map((imposto) => (
              <div key={imposto.nome} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">{imposto.nome}</h4>
                  <p className="text-sm text-muted-foreground">
                    Alíquota: {imposto.aliquota}%
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold">R$ {imposto.valor.toLocaleString('pt-BR')}</p>
                  <p className="text-sm text-muted-foreground">
                    Venc: {imposto.vencimento}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Obrigações Acessórias</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { nome: 'SPED Fiscal', prazo: '15/02/2024', status: 'Pendente' },
              { nome: 'DCTF', prazo: '15/02/2024', status: 'Pendente' },
              { nome: 'DEFIS', prazo: '31/03/2024', status: 'Aguardando' },
              { nome: 'RAIS', prazo: '31/03/2024', status: 'Aguardando' }
            ].map((obrigacao) => (
              <div key={obrigacao.nome} className="flex items-center justify-between p-3 border rounded">
                <div>
                  <span className="font-medium">{obrigacao.nome}</span>
                  <p className="text-sm text-muted-foreground">Prazo: {obrigacao.prazo}</p>
                </div>
                <Badge 
                  variant={
                    obrigacao.status === 'Pendente' ? 'destructive' :
                    obrigacao.status === 'Aguardando' ? 'secondary' : 'default'
                  }
                >
                  {obrigacao.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderNovaEntrada = () => (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={() => setVisualizacao('entradas')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar
        </Button>
        <h2 className="text-2xl font-bold">Nova Entrada (Venda/Receita)</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informações da Entrada</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="data-entrada">Data da Entrada *</Label>
              <Input id="data-entrada" type="date" />
            </div>
            <div>
              <Label htmlFor="cliente">Cliente/Órgão *</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o cliente" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="prefeitura-sp">Prefeitura Municipal de SP</SelectItem>
                  <SelectItem value="governo-sp">Governo do Estado de SP</SelectItem>
                  <SelectItem value="ministerio-saude">Ministério da Saúde</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="licitacao-vinculada">Licitação Vinculada</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a licitação" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lp001">LP001/2024 - Material de Escritório</SelectItem>
                  <SelectItem value="lp002">LP002/2024 - Equipamentos de Informática</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="numero-nf">Número da Nota Fiscal *</Label>
              <Input id="numero-nf" placeholder="NF-001" />
            </div>
            <div>
              <Label htmlFor="valor-total">Valor Total *</Label>
              <Input id="valor-total" type="number" step="0.01" placeholder="15000.00" />
            </div>
            <div>
              <Label htmlFor="forma-recebimento">Forma de Recebimento *</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a forma" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="boleto">Boleto</SelectItem>
                  <SelectItem value="pix">PIX</SelectItem>
                  <SelectItem value="transferencia">Transferência</SelectItem>
                  <SelectItem value="cartao">Cartão</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="frete-cobrado">Frete Cobrado</Label>
              <Input id="frete-cobrado" type="number" step="0.01" placeholder="0.00" />
            </div>
            <div>
              <Label htmlFor="desconto">Desconto Aplicado</Label>
              <Input id="desconto" type="number" step="0.01" placeholder="0.00" />
            </div>
            <div>
              <Label htmlFor="status-entrada">Status *</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pendente">Pendente</SelectItem>
                  <SelectItem value="recebido">Recebido</SelectItem>
                  <SelectItem value="atrasado">Atrasado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="descricao-entrada">Descrição *</Label>
            <Textarea 
              id="descricao-entrada" 
              placeholder="Descrição detalhada da entrada..."
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="observacoes-entrada">Observações</Label>
            <Textarea 
              id="observacoes-entrada" 
              placeholder="Observações adicionais..."
              rows={2}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={() => setVisualizacao('entradas')}>
          Cancelar
        </Button>
        <Button>
          Salvar Entrada
        </Button>
      </div>
    </div>
  )

  const renderNovaSaida = () => (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={() => setVisualizacao('saidas')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar
        </Button>
        <h2 className="text-2xl font-bold">Nova Saída (Compra/Despesa)</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informações da Saída</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="data-saida">Data da Saída *</Label>
              <Input id="data-saida" type="date" />
            </div>
            <div>
              <Label htmlFor="fornecedor">Fornecedor *</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o fornecedor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="abc-distribuidora">ABC Distribuidora</SelectItem>
                  <SelectItem value="xyz-suprimentos">XYZ Suprimentos</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="numero-nf-saida">Número da Nota Fiscal *</Label>
              <Input id="numero-nf-saida" placeholder="NF-12345" />
            </div>
            <div>
              <Label htmlFor="categoria-saida">Categoria *</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="compras">Compras</SelectItem>
                  <SelectItem value="despesas-operacionais">Despesas Operacionais</SelectItem>
                  <SelectItem value="despesas-administrativas">Despesas Administrativas</SelectItem>
                  <SelectItem value="impostos">Impostos</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="valor-total-saida">Valor Total *</Label>
              <Input id="valor-total-saida" type="number" step="0.01" placeholder="8500.00" />
            </div>
            <div>
              <Label htmlFor="forma-pagamento-saida">Forma de Pagamento *</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a forma" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="boleto">Boleto</SelectItem>
                  <SelectItem value="pix">PIX</SelectItem>
                  <SelectItem value="transferencia">Transferência</SelectItem>
                  <SelectItem value="cartao">Cartão</SelectItem>
                  <SelectItem value="dinheiro">Dinheiro</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="frete-pago">Frete Pago</Label>
              <Input id="frete-pago" type="number" step="0.01" placeholder="0.00" />
            </div>
            <div>
              <Label htmlFor="prazo-pagamento-saida">Prazo de Pagamento (dias)</Label>
              <Input id="prazo-pagamento-saida" type="number" placeholder="30" />
            </div>
            <div>
              <Label htmlFor="status-saida">Status *</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pendente">Pendente</SelectItem>
                  <SelectItem value="pago">Pago</SelectItem>
                  <SelectItem value="atrasado">Atrasado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="descricao-saida">Descrição *</Label>
            <Textarea 
              id="descricao-saida" 
              placeholder="Descrição detalhada da saída..."
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="centro-custo">Centro de Custo</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o centro de custo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="administrativo">Administrativo</SelectItem>
                <SelectItem value="comercial">Comercial</SelectItem>
                <SelectItem value="operacional">Operacional</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="observacoes-saida">Observações</Label>
            <Textarea 
              id="observacoes-saida" 
              placeholder="Observações adicionais..."
              rows={2}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={() => setVisualizacao('saidas')}>
          Cancelar
        </Button>
        <Button>
          Salvar Saída
        </Button>
      </div>
    </div>
  )

  const renderModulo = () => {
    switch (visualizacao) {
      case 'dashboard':
        return renderDashboard()
      case 'entradas':
        return renderEntradas()
      case 'saidas':
        return renderSaidas()
      case 'lucro':
        return renderLucro()
      case 'impostos':
        return renderImpostos()
      case 'nova-entrada':
        return renderNovaEntrada()
      case 'nova-saida':
        return renderNovaSaida()
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
          <h1 className="text-3xl font-bold">Controle Financeiro</h1>
          <p className="text-muted-foreground">Gestão completa de entradas, saídas e análise de lucro</p>
        </div>
      </div>

      {/* Navegação do módulo */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={visualizacao === 'dashboard' ? 'default' : 'outline'}
          onClick={() => setVisualizacao('dashboard')}
        >
          <BarChart3 className="h-4 w-4 mr-2" />
          Dashboard
        </Button>
        <Button
          variant={visualizacao === 'entradas' ? 'default' : 'outline'}
          onClick={() => setVisualizacao('entradas')}
        >
          <TrendingUp className="h-4 w-4 mr-2" />
          Entradas
        </Button>
        <Button
          variant={visualizacao === 'saidas' ? 'default' : 'outline'}
          onClick={() => setVisualizacao('saidas')}
        >
          <TrendingDown className="h-4 w-4 mr-2" />
          Saídas
        </Button>
        <Button
          variant={visualizacao === 'lucro' ? 'default' : 'outline'}
          onClick={() => setVisualizacao('lucro')}
        >
          <PieChart className="h-4 w-4 mr-2" />
          Análise de Lucro
        </Button>
        <Button
          variant={visualizacao === 'impostos' ? 'default' : 'outline'}
          onClick={() => setVisualizacao('impostos')}
        >
          <Receipt className="h-4 w-4 mr-2" />
          Impostos
        </Button>
      </div>

      {renderModulo()}
    </div>
  )
}