'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { 
  ArrowLeft,
  Download,
  FileSpreadsheet,
  FileText,
  BarChart3,
  PieChart,
  TrendingUp,
  Calendar,
  Filter,
  Eye,
  Printer,
  Mail,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Clock,
  Package,
  Users,
  DollarSign,
  Target,
  Truck,
  FileBarChart,
  Calculator
} from 'lucide-react'
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  PieChart as RechartsPieChart, 
  Pie,
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts'
import * as XLSX from 'xlsx'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

interface RelatoriosPlanilhasProps {
  onVoltar: () => void
}

// Dados simulados para demonstração
const dadosVendas = [
  { mes: 'Jan', vendas: 45000, lucro: 12000, impostos: 8100, custos: 25000 },
  { mes: 'Fev', vendas: 52000, lucro: 14500, impostos: 9360, custos: 28000 },
  { mes: 'Mar', vendas: 48000, lucro: 13200, impostos: 8640, custos: 26000 },
  { mes: 'Abr', vendas: 61000, lucro: 16800, impostos: 10980, custos: 33000 },
  { mes: 'Mai', vendas: 55000, lucro: 15200, impostos: 9900, custos: 30000 },
  { mes: 'Jun', vendas: 67000, lucro: 18500, impostos: 12060, custos: 36000 }
]

const dadosEstoque = [
  { categoria: 'Material Escritório', valor: 45000, quantidade: 1250, emFalta: 3, estoqueBaixo: 8 },
  { categoria: 'Equipamentos TI', valor: 120000, quantidade: 85, emFalta: 2, estoqueBaixo: 5 },
  { categoria: 'Material Limpeza', valor: 28000, quantidade: 890, emFalta: 1, estoqueBaixo: 4 },
  { categoria: 'Móveis', valor: 75000, quantidade: 156, emFalta: 1, estoqueBaixo: 3 },
  { categoria: 'Eletrônicos', valor: 95000, quantidade: 234, emFalta: 1, estoqueBaixo: 3 }
]

const dadosImpostos = [
  { tipo: 'ICMS', valor: 15600, aliquota: 18, baseCalculo: 86667, vencimento: '2024-02-15', cor: '#8884d8' },
  { tipo: 'PIS', valor: 3200, aliquota: 1.65, baseCalculo: 193939, vencimento: '2024-02-20', cor: '#82ca9d' },
  { tipo: 'COFINS', valor: 8900, aliquota: 7.6, baseCalculo: 117105, vencimento: '2024-02-20', cor: '#ffc658' },
  { tipo: 'IPI', valor: 4500, aliquota: 10, baseCalculo: 45000, vencimento: '2024-02-25', cor: '#ff7300' },
  { tipo: 'Simples Nacional', valor: 12800, aliquota: 8.5, baseCalculo: 150588, vencimento: '2024-02-20', cor: '#00ff88' }
]

const dadosLicitacoes = [
  { status: 'Vencidas', quantidade: 12, valor: 850000, taxa: 42.8, cor: '#00C49F' },
  { status: 'Em Andamento', quantidade: 8, valor: 420000, taxa: 28.6, cor: '#FFBB28' },
  { status: 'Perdidas', quantidade: 15, valor: 680000, taxa: 53.6, cor: '#FF8042' },
  { status: 'Aguardando', quantidade: 5, valor: 290000, taxa: 17.9, cor: '#0088FE' }
]

const produtosMaisVendidos = [
  { codigo: 'P001', produto: 'Papel A4 - Resma', categoria: 'Escritório', quantidade: 2500, receita: 45000, estoque: 150, fornecedor: 'Distribuidora ABC' },
  { codigo: 'P002', produto: 'Caneta Esferográfica', categoria: 'Escritório', quantidade: 1800, receita: 12600, estoque: 300, fornecedor: 'Suprimentos XYZ' },
  { codigo: 'P003', produto: 'Grampeador', categoria: 'Escritório', quantidade: 450, receita: 18000, estoque: 80, fornecedor: 'Comercial 123' },
  { codigo: 'P004', produto: 'Pasta Suspensa', categoria: 'Arquivo', quantidade: 890, receita: 22250, estoque: 120, fornecedor: 'Distribuidora ABC' },
  { codigo: 'P005', produto: 'Toner HP LaserJet', categoria: 'Informática', quantidade: 120, receita: 36000, estoque: 25, fornecedor: 'Tech Solutions' }
]

const fornecedoresTop = [
  { 
    id: 'F001',
    fornecedor: 'Distribuidora ABC Ltda', 
    cnpj: '12.345.678/0001-90',
    contato: 'João Silva - (11) 99999-9999',
    compras: 15, 
    valor: 125000, 
    avaliacao: 4.8,
    produtosFornecidos: ['Papel A4', 'Pasta Suspensa', 'Envelopes'],
    ultimaCompra: '2024-01-25'
  },
  { 
    id: 'F002',
    fornecedor: 'Suprimentos XYZ S/A', 
    cnpj: '98.765.432/0001-10',
    contato: 'Maria Santos - (11) 88888-8888',
    compras: 12, 
    valor: 98000, 
    avaliacao: 4.6,
    produtosFornecidos: ['Canetas', 'Lápis', 'Borrachas'],
    ultimaCompra: '2024-01-28'
  },
  { 
    id: 'F003',
    fornecedor: 'Comercial 123', 
    cnpj: '11.222.333/0001-44',
    contato: 'Pedro Costa - (11) 77777-7777',
    compras: 8, 
    valor: 67000, 
    avaliacao: 4.2,
    produtosFornecidos: ['Grampeadores', 'Perfuradores'],
    ultimaCompra: '2024-01-20'
  }
]

const licitacoesAtivas = [
  {
    edital: 'LP001/2024',
    orgao: 'Prefeitura Municipal de São Paulo',
    objeto: 'Aquisição de Material de Escritório para Secretarias',
    valor: 85000,
    dataAbertura: '2024-01-15',
    dataEncerramento: '2024-02-15',
    status: 'Vencedor',
    resultado: 'Classificado em 1º lugar'
  },
  {
    edital: 'PE002/2024',
    orgao: 'Governo do Estado de SP',
    objeto: 'Fornecimento de Equipamentos de Informática',
    valor: 320000,
    dataAbertura: '2024-01-20',
    dataEncerramento: '2024-02-20',
    status: 'Em Andamento',
    resultado: 'Aguardando resultado'
  },
  {
    edital: 'CC003/2024',
    orgao: 'Ministério da Saúde',
    objeto: 'Material Médico-Hospitalar',
    valor: 150000,
    dataAbertura: '2024-01-10',
    dataEncerramento: '2024-02-10',
    status: 'Perdida',
    resultado: 'Classificado em 3º lugar'
  }
]

const emendasEntrega = [
  {
    contrato: 'LP001/2024',
    numeroEmenda: 1,
    dataProgramada: '2024-02-12',
    produtos: 'Papel A4 (500 resmas), Canetas (200 unid)',
    quantidade: 700,
    valor: 28500,
    status: 'Entregue',
    notaFiscal: 'NF-001234',
    responsavel: 'Carlos Silva'
  },
  {
    contrato: 'LP001/2024',
    numeroEmenda: 2,
    dataProgramada: '2024-02-26',
    produtos: 'Pastas (150 unid), Grampeadores (50 unid)',
    quantidade: 200,
    valor: 18500,
    status: 'Pendente',
    notaFiscal: '-',
    responsavel: 'Ana Costa'
  },
  {
    contrato: 'PE002/2024',
    numeroEmenda: 1,
    dataProgramada: '2024-03-05',
    produtos: 'Notebooks (10 unid), Impressoras (5 unid)',
    quantidade: 15,
    valor: 85000,
    status: 'Separado',
    notaFiscal: '-',
    responsavel: 'Roberto Lima'
  }
]

const movimentacaoFinanceira = [
  { data: '2024-01-28', tipo: 'Entrada', descricao: 'Recebimento LP001/2024 - 1ª Parcela', valor: 28500, saldo: 145000 },
  { data: '2024-01-25', tipo: 'Saída', descricao: 'Compra Distribuidora ABC', valor: -15000, saldo: 116500 },
  { data: '2024-01-22', tipo: 'Entrada', descricao: 'Recebimento CC005/2023', valor: 42000, saldo: 131500 },
  { data: '2024-01-20', tipo: 'Saída', descricao: 'Pagamento Fornecedor XYZ', valor: -8500, saldo: 89500 },
  { data: '2024-01-18', tipo: 'Entrada', descricao: 'Venda Direta - Cliente ABC', valor: 12000, saldo: 98000 }
]

const kpis = {
  faturamentoMes: 180000,
  lucroLiquido: 45000,
  margemMedia: 25,
  cargaTributaria: 18.5,
  ticketMedio: 2850,
  prazoMedioRecebimento: 28,
  inadimplencia: 2.3,
  taxaSucessoLicitacoes: 42.8
}

export default function RelatoriosPlanilhas({ onVoltar }: RelatoriosPlanilhasProps) {
  const [tipoRelatorio, setTipoRelatorio] = useState<'planilhas' | 'relatorios' | 'dashboards'>('dashboards')
  const [periodoSelecionado, setPeriodoSelecionado] = useState('mes-atual')
  const [formatoExportacao, setFormatoExportacao] = useState('excel')

  // Funções de exportação
  const exportarExcel = (dados: any[], nomeArquivo: string) => {
    const ws = XLSX.utils.json_to_sheet(dados)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Dados')
    XLSX.writeFile(wb, `${nomeArquivo}.xlsx`)
  }

  const exportarCSV = (dados: any[], nomeArquivo: string) => {
    const ws = XLSX.utils.json_to_sheet(dados)
    const csv = XLSX.utils.sheet_to_csv(ws)
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${nomeArquivo}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const exportarPDF = async (elementId: string, nomeArquivo: string) => {
    const element = document.getElementById(elementId)
    if (element) {
      const canvas = await html2canvas(element)
      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF()
      const imgWidth = 210
      const pageHeight = 295
      const imgHeight = (canvas.height * imgWidth) / canvas.width
      let heightLeft = imgHeight

      let position = 0

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight
        pdf.addPage()
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
        heightLeft -= pageHeight
      }

      pdf.save(`${nomeArquivo}.pdf`)
    }
  }

  const renderPlanilhasAutomaticas = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Planilhas Automáticas</h2>
        <div className="flex items-center gap-2">
          <Select value={formatoExportacao} onValueChange={setFormatoExportacao}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="excel">Excel</SelectItem>
              <SelectItem value="csv">CSV</SelectItem>
              <SelectItem value="pdf">PDF</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Planilha de Produtos */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Produtos
            </CardTitle>
            <CardDescription>
              Lista completa com preços, estoque e margem
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>• Código, Nome, Categoria</p>
              <p>• Estoque atual</p>
              <p>• Preço de custo e venda</p>
              <p>• Margem de lucro</p>
              <p>• Fornecedor principal</p>
            </div>
            <Button 
              className="w-full mt-4" 
              onClick={() => {
                const dados = produtosMaisVendidos.map(p => ({
                  codigo: p.codigo,
                  produto: p.produto,
                  categoria: p.categoria,
                  estoque: p.estoque,
                  precoCusto: (p.receita / p.quantidade * 0.7).toFixed(2),
                  precoVenda: (p.receita / p.quantidade).toFixed(2),
                  margemLucro: '30%',
                  fornecedor: p.fornecedor
                }))
                if (formatoExportacao === 'excel') exportarExcel(dados, 'planilha-produtos')
                else if (formatoExportacao === 'csv') exportarCSV(dados, 'planilha-produtos')
              }}
            >
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </Button>
          </CardContent>
        </Card>

        {/* Planilha de Fornecedores */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Fornecedores
            </CardTitle>
            <CardDescription>
              Dados cadastrais e histórico de compras
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>• Dados cadastrais</p>
              <p>• Contatos principais</p>
              <p>• Produtos fornecidos</p>
              <p>• Histórico de compras</p>
              <p>• Avaliação de desempenho</p>
            </div>
            <Button 
              className="w-full mt-4"
              onClick={() => {
                if (formatoExportacao === 'excel') exportarExcel(fornecedoresTop, 'planilha-fornecedores')
                else if (formatoExportacao === 'csv') exportarCSV(fornecedoresTop, 'planilha-fornecedores')
              }}
            >
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </Button>
          </CardContent>
        </Card>

        {/* Planilha de Licitações */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Licitações Ativas
            </CardTitle>
            <CardDescription>
              Status e resultados das participações
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>• Número do edital</p>
              <p>• Órgão público</p>
              <p>• Objeto e valor</p>
              <p>• Datas importantes</p>
              <p>• Status da participação</p>
              <p>• Resultado</p>
            </div>
            <Button 
              className="w-full mt-4"
              onClick={() => {
                if (formatoExportacao === 'excel') exportarExcel(licitacoesAtivas, 'planilha-licitacoes')
                else if (formatoExportacao === 'csv') exportarCSV(licitacoesAtivas, 'planilha-licitacoes')
              }}
            >
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </Button>
          </CardContent>
        </Card>

        {/* Planilha de Emendas de Entrega */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Truck className="h-5 w-5" />
              Emendas de Entrega
            </CardTitle>
            <CardDescription>
              Cronograma e status das entregas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>• Contrato/Licitação</p>
              <p>• Número da emenda</p>
              <p>• Data programada</p>
              <p>• Produtos e quantidade</p>
              <p>• Status de entrega</p>
              <p>• Nota fiscal</p>
            </div>
            <Button 
              className="w-full mt-4"
              onClick={() => {
                if (formatoExportacao === 'excel') exportarExcel(emendasEntrega, 'planilha-emendas')
                else if (formatoExportacao === 'csv') exportarCSV(emendasEntrega, 'planilha-emendas')
              }}
            >
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </Button>
          </CardContent>
        </Card>

        {/* Planilha Financeira */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Financeiro
            </CardTitle>
            <CardDescription>
              Fluxo de caixa e movimentações
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>• Entradas e saídas</p>
              <p>• Saldo por período</p>
              <p>• Contas a pagar</p>
              <p>• Contas a receber</p>
              <p>• Fluxo de caixa</p>
            </div>
            <Button 
              className="w-full mt-4"
              onClick={() => {
                if (formatoExportacao === 'excel') exportarExcel(movimentacaoFinanceira, 'planilha-financeiro')
                else if (formatoExportacao === 'csv') exportarCSV(movimentacaoFinanceira, 'planilha-financeiro')
              }}
            >
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </Button>
          </CardContent>
        </Card>

        {/* Planilha de Impostos */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              Impostos
            </CardTitle>
            <CardDescription>
              Cálculos e vencimentos tributários
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>• Período de apuração</p>
              <p>• Tipo de imposto</p>
              <p>• Base de cálculo</p>
              <p>• Alíquota aplicada</p>
              <p>• Valor devido</p>
              <p>• Data de vencimento</p>
            </div>
            <Button 
              className="w-full mt-4"
              onClick={() => {
                if (formatoExportacao === 'excel') exportarExcel(dadosImpostos, 'planilha-impostos')
                else if (formatoExportacao === 'csv') exportarCSV(dadosImpostos, 'planilha-impostos')
              }}
            >
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </Button>
          </CardContent>
        </Card>

        {/* Planilha de Lucro */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Análise de Lucro
            </CardTitle>
            <CardDescription>
              Demonstrativo de resultados
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>• Vendas por período</p>
              <p>• Custos dos produtos</p>
              <p>• Impostos incidentes</p>
              <p>• Lucro bruto e líquido</p>
              <p>• Margem de lucro (%)</p>
            </div>
            <Button 
              className="w-full mt-4"
              onClick={() => {
                const dadosLucro = dadosVendas.map(d => ({
                  periodo: d.mes,
                  vendas: d.vendas,
                  custos: d.custos,
                  impostos: d.impostos,
                  lucroBruto: d.vendas - d.custos,
                  lucroLiquido: d.lucro,
                  margemLucro: ((d.lucro / d.vendas) * 100).toFixed(1) + '%'
                }))
                if (formatoExportacao === 'excel') exportarExcel(dadosLucro, 'planilha-lucro')
                else if (formatoExportacao === 'csv') exportarCSV(dadosLucro, 'planilha-lucro')
              }}
            >
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderRelatoriosGerenciais = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Relatórios Gerenciais</h2>
        <div className="flex items-center gap-2">
          <Select value={periodoSelecionado} onValueChange={setPeriodoSelecionado}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mes-atual">Mês Atual</SelectItem>
              <SelectItem value="trimestre">Trimestre</SelectItem>
              <SelectItem value="semestre">Semestre</SelectItem>
              <SelectItem value="ano">Ano</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filtros
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Relatório de Estoque */}
        <Card id="relatorio-estoque">
          <CardHeader>
            <CardTitle>Relatório de Estoque</CardTitle>
            <CardDescription>Análise completa do estoque atual</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Produtos em falta</p>
                  <p className="text-2xl font-bold text-red-600">8</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Estoque baixo</p>
                  <p className="text-2xl font-bold text-yellow-600">23</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Produtos parados</p>
                  <p className="text-2xl font-bold text-gray-600">12</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Valor total</p>
                  <p className="text-2xl font-bold text-green-600">R$ 363K</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium">Produtos em Falta</h4>
                <div className="space-y-1 text-sm">
                  <p className="flex justify-between">
                    <span>Papel A4 Premium</span>
                    <Badge variant="destructive">0 unid</Badge>
                  </p>
                  <p className="flex justify-between">
                    <span>Toner HP 85A</span>
                    <Badge variant="destructive">0 unid</Badge>
                  </p>
                  <p className="flex justify-between">
                    <span>Pasta Suspensa Verde</span>
                    <Badge variant="destructive">0 unid</Badge>
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Estoque Baixo (< 10% do mínimo)</h4>
                <div className="space-y-1 text-sm">
                  <p className="flex justify-between">
                    <span>Caneta Azul BIC</span>
                    <Badge variant="secondary">5 unid</Badge>
                  </p>
                  <p className="flex justify-between">
                    <span>Grampeador Grande</span>
                    <Badge variant="secondary">3 unid</Badge>
                  </p>
                  <p className="flex justify-between">
                    <span>Perfurador 2 Furos</span>
                    <Badge variant="secondary">2 unid</Badge>
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  <Eye className="h-4 w-4 mr-2" />
                  Visualizar Completo
                </Button>
                <Button size="sm" onClick={() => exportarPDF('relatorio-estoque', 'relatorio-estoque')}>
                  <Download className="h-4 w-4 mr-2" />
                  Exportar PDF
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Relatório de Vendas */}
        <Card id="relatorio-vendas">
          <CardHeader>
            <CardTitle>Relatório de Vendas</CardTitle>
            <CardDescription>Performance de vendas e produtos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-medium">Top 5 Produtos Mais Vendidos</h4>
                {produtosMaisVendidos.slice(0, 5).map((produto, index) => (
                  <div key={index} className="flex justify-between items-center text-sm">
                    <div>
                      <p className="font-medium">{produto.produto}</p>
                      <p className="text-muted-foreground">{produto.quantidade} unidades</p>
                    </div>
                    <span className="font-medium text-green-600">R$ {produto.receita.toLocaleString()}</span>
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Ticket médio</p>
                  <p className="text-lg font-bold">R$ 2.850</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Total vendas</p>
                  <p className="text-lg font-bold">R$ 180K</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Clientes ativos</p>
                  <p className="text-lg font-bold">45</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Sazonalidade</p>
                  <p className="text-lg font-bold text-green-600">+15%</p>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  <Eye className="h-4 w-4 mr-2" />
                  Visualizar Completo
                </Button>
                <Button size="sm" onClick={() => exportarExcel(produtosMaisVendidos, 'relatorio-vendas')}>
                  <Download className="h-4 w-4 mr-2" />
                  Exportar Excel
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Relatório de Compras */}
        <Card id="relatorio-compras">
          <CardHeader>
            <CardTitle>Relatório de Compras</CardTitle>
            <CardDescription>Análise de fornecedores e compras</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-medium">Fornecedores Preferenciais</h4>
                {fornecedoresTop.slice(0, 3).map((fornecedor, index) => (
                  <div key={index} className="flex justify-between items-center text-sm">
                    <div>
                      <p className="font-medium">{fornecedor.fornecedor}</p>
                      <p className="text-muted-foreground">{fornecedor.compras} compras</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">R$ {fornecedor.valor.toLocaleString()}</p>
                      <p className="text-yellow-600">★ {fornecedor.avaliacao}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Ticket médio compra</p>
                  <p className="text-lg font-bold">R$ 8.500</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Total compras</p>
                  <p className="text-lg font-bold">R$ 290K</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Fornecedores ativos</p>
                  <p className="text-lg font-bold">23</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Prazo médio</p>
                  <p className="text-lg font-bold">15 dias</p>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  <Eye className="h-4 w-4 mr-2" />
                  Visualizar Completo
                </Button>
                <Button size="sm" onClick={() => exportarExcel(fornecedoresTop, 'relatorio-compras')}>
                  <Download className="h-4 w-4 mr-2" />
                  Exportar Excel
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Relatório de Licitações */}
        <Card id="relatorio-licitacoes">
          <CardHeader>
            <CardTitle>Desempenho em Licitações</CardTitle>
            <CardDescription>Taxa de sucesso e análise</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Taxa de vitória</p>
                  <p className="text-2xl font-bold text-green-600">42.8%</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Valor contratado</p>
                  <p className="text-2xl font-bold">R$ 850K</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Participações</p>
                  <p className="text-2xl font-bold">40</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Vitórias</p>
                  <p className="text-2xl font-bold text-green-600">12</p>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Principais Órgãos Clientes</h4>
                <div className="space-y-1 text-sm">
                  <p className="flex justify-between">
                    <span>Prefeitura Municipal SP</span>
                    <span className="font-medium">5 contratos</span>
                  </p>
                  <p className="flex justify-between">
                    <span>Governo do Estado SP</span>
                    <span className="font-medium">3 contratos</span>
                  </p>
                  <p className="flex justify-between">
                    <span>Ministério da Saúde</span>
                    <span className="font-medium">2 contratos</span>
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Modalidades com Mais Sucesso</h4>
                <div className="space-y-1 text-sm">
                  <p className="flex justify-between">
                    <span>Licitação Pública</span>
                    <Badge className="bg-green-100 text-green-800">60% sucesso</Badge>
                  </p>
                  <p className="flex justify-between">
                    <span>Pregão Eletrônico</span>
                    <Badge className="bg-blue-100 text-blue-800">45% sucesso</Badge>
                  </p>
                  <p className="flex justify-between">
                    <span>Concorrência</span>
                    <Badge className="bg-yellow-100 text-yellow-800">30% sucesso</Badge>
                  </p>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  <Eye className="h-4 w-4 mr-2" />
                  Visualizar Completo
                </Button>
                <Button size="sm" onClick={() => exportarPDF('relatorio-licitacoes', 'relatorio-licitacoes')}>
                  <Download className="h-4 w-4 mr-2" />
                  Exportar PDF
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Relatório de Entregas */}
        <Card id="relatorio-entregas">
          <CardHeader>
            <CardTitle>Relatório de Entregas</CardTitle>
            <CardDescription>Pontualidade e execução de contratos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Pontualidade</p>
                  <p className="text-2xl font-bold text-green-600">92%</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Emendas atrasadas</p>
                  <p className="text-2xl font-bold text-red-600">2</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Contratos em execução</p>
                  <p className="text-2xl font-bold">8</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Próximas entregas</p>
                  <p className="text-2xl font-bold text-orange-600">5</p>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Próximas Entregas (7 dias)</h4>
                <div className="space-y-1 text-sm">
                  <p className="flex justify-between">
                    <span>LP001/2024 - Emenda 2</span>
                    <Badge variant="outline">26/02</Badge>
                  </p>
                  <p className="flex justify-between">
                    <span>CC005/2023 - Final</span>
                    <Badge variant="outline">28/02</Badge>
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Próximas Entregas (15 dias)</h4>
                <div className="space-y-1 text-sm">
                  <p className="flex justify-between">
                    <span>PE002/2024 - Emenda 1</span>
                    <Badge variant="secondary">05/03</Badge>
                  </p>
                  <p className="flex justify-between">
                    <span>LP003/2024 - Emenda 1</span>
                    <Badge variant="secondary">08/03</Badge>
                  </p>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  <Eye className="h-4 w-4 mr-2" />
                  Visualizar Completo
                </Button>
                <Button size="sm" onClick={() => exportarExcel(emendasEntrega, 'relatorio-entregas')}>
                  <Download className="h-4 w-4 mr-2" />
                  Exportar Excel
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* DRE */}
        <Card id="dre">
          <CardHeader>
            <CardTitle>DRE - Demonstração do Resultado</CardTitle>
            <CardDescription>Resultado do exercício atual</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between font-medium">
                <span>Receita Bruta</span>
                <span>R$ 180.000</span>
              </div>
              <div className="flex justify-between text-red-600 pl-4">
                <span>(-) Impostos sobre Vendas</span>
                <span>R$ 33.300</span>
              </div>
              <div className="flex justify-between border-t pt-2 font-medium">
                <span>Receita Líquida</span>
                <span>R$ 146.700</span>
              </div>
              <div className="flex justify-between text-red-600 pl-4">
                <span>(-) CMV (Custo Mercadoria Vendida)</span>
                <span>R$ 72.000</span>
              </div>
              <div className="flex justify-between border-t pt-2 font-medium">
                <span>Lucro Bruto</span>
                <span>R$ 74.700</span>
              </div>
              <div className="flex justify-between text-red-600 pl-4">
                <span>(-) Despesas Operacionais</span>
                <span>R$ 29.700</span>
              </div>
              <div className="flex justify-between border-t pt-2 font-bold text-green-600 text-base">
                <span>Lucro Líquido</span>
                <span>R$ 45.000</span>
              </div>
              
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <p className="text-muted-foreground">Margem Bruta</p>
                    <p className="font-medium">50.9%</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Margem Líquida</p>
                    <p className="font-medium">25.0%</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Carga Tributária</p>
                    <p className="font-medium">18.5%</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Eficiência Operacional</p>
                    <p className="font-medium">83.2%</p>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2 pt-2">
                <Button size="sm" variant="outline">
                  <Eye className="h-4 w-4 mr-2" />
                  Visualizar Completo
                </Button>
                <Button size="sm" onClick={() => exportarPDF('dre', 'dre-mensal')}>
                  <Download className="h-4 w-4 mr-2" />
                  Exportar PDF
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderDashboardsVisuais = () => (
    <div className="space-y-6" id="dashboard-visual">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Dashboards Visuais</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Atualizar
          </Button>
          <Button variant="outline" size="sm" onClick={() => exportarPDF('dashboard-visual', 'dashboard-visual')}>
            <Download className="h-4 w-4 mr-2" />
            Exportar PDF
          </Button>
        </div>
      </div>

      {/* KPIs Principais */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Faturamento Mês</p>
              <p className="text-2xl font-bold text-green-600">R$ {(kpis.faturamentoMes / 1000).toFixed(0)}K</p>
              <p className="text-xs text-green-600">+12% vs mês anterior</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Lucro Líquido</p>
              <p className="text-2xl font-bold text-blue-600">R$ {(kpis.lucroLiquido / 1000).toFixed(0)}K</p>
              <p className="text-xs text-blue-600">Margem {kpis.margemMedia}%</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Carga Tributária</p>
              <p className="text-2xl font-bold text-purple-600">{kpis.cargaTributaria}%</p>
              <p className="text-xs text-purple-600">R$ 33.3K impostos</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Taxa Sucesso</p>
              <p className="text-2xl font-bold text-orange-600">{kpis.taxaSucessoLicitacoes}%</p>
              <p className="text-xs text-orange-600">12 de 28 licitações</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de Evolução de Vendas */}
        <Card>
          <CardHeader>
            <CardTitle>Evolução de Vendas</CardTitle>
            <CardDescription>Vendas, lucro e custos nos últimos 6 meses</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dadosVendas}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip formatter={(value) => [`R$ ${Number(value).toLocaleString()}`, '']} />
                <Legend />
                <Line type="monotone" dataKey="vendas" stroke="#8884d8" strokeWidth={2} name="Vendas" />
                <Line type="monotone" dataKey="lucro" stroke="#82ca9d" strokeWidth={2} name="Lucro" />
                <Line type="monotone" dataKey="custos" stroke="#ff7300" strokeWidth={2} name="Custos" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Gráfico de Composição de Impostos */}
        <Card>
          <CardHeader>
            <CardTitle>Composição de Impostos</CardTitle>
            <CardDescription>Distribuição dos impostos pagos no mês</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie
                  data={dadosImpostos}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="valor"
                  label={({ tipo, valor }) => `${tipo}: R$ ${valor.toLocaleString()}`}
                >
                  {dadosImpostos.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.cor} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`R$ ${Number(value).toLocaleString()}`, 'Valor']} />
              </RechartsPieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Gráfico de Estoque por Categoria */}
        <Card>
          <CardHeader>
            <CardTitle>Estoque por Categoria</CardTitle>
            <CardDescription>Valor em estoque por categoria de produto</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dadosEstoque}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="categoria" angle={-45} textAnchor="end" height={80} />
                <YAxis />
                <Tooltip formatter={(value) => [`R$ ${Number(value).toLocaleString()}`, 'Valor']} />
                <Bar dataKey="valor" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Gráfico de Licitações por Status */}
        <Card>
          <CardHeader>
            <CardTitle>Licitações por Status</CardTitle>
            <CardDescription>Distribuição das licitações por resultado</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie
                  data={dadosLicitacoes}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="quantidade"
                  label={({ status, quantidade }) => `${status}: ${quantidade}`}
                >
                  {dadosLicitacoes.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.cor} />
                  ))}
                </Pie>
                <Tooltip />
              </RechartsPieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Indicadores Adicionais */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Ticket Médio</p>
              <p className="text-xl font-bold">R$ {kpis.ticketMedio.toLocaleString()}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Prazo Médio Recebimento</p>
              <p className="text-xl font-bold">{kpis.prazoMedioRecebimento} dias</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Inadimplência</p>
              <p className="text-xl font-bold text-red-600">{kpis.inadimplencia}%</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Giro de Estoque</p>
              <p className="text-xl font-bold">4.2x/ano</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Calendário de Eventos */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Calendário de Eventos Importantes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <h4 className="font-medium text-red-600 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Vencimentos de Certidões
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between p-2 bg-red-50 rounded">
                  <span>CND Federal</span>
                  <Badge variant="destructive">15/02/2024</Badge>
                </div>
                <div className="flex items-center justify-between p-2 bg-yellow-50 rounded">
                  <span>FGTS</span>
                  <Badge className="bg-yellow-500">22/02/2024</Badge>
                </div>
                <div className="flex items-center justify-between p-2 bg-yellow-50 rounded">
                  <span>CND Municipal</span>
                  <Badge className="bg-yellow-500">28/02/2024</Badge>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-medium text-blue-600 flex items-center gap-2">
                <Target className="h-4 w-4" />
                Licitações
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between p-2 bg-blue-50 rounded">
                  <span>Abertura LP003/2024</span>
                  <Badge variant="outline">10/02</Badge>
                </div>
                <div className="flex items-center justify-between p-2 bg-blue-50 rounded">
                  <span>Entrega Proposta PE002</span>
                  <Badge variant="outline">20/02</Badge>
                </div>
                <div className="flex items-center justify-between p-2 bg-green-50 rounded">
                  <span>Resultado CC001</span>
                  <Badge className="bg-green-500">25/02</Badge>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-medium text-green-600 flex items-center gap-2">
                <Truck className="h-4 w-4" />
                Entregas Programadas
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between p-2 bg-green-50 rounded">
                  <span>Emenda 1 - LP001/2024</span>
                  <Badge className="bg-green-500">12/02</Badge>
                </div>
                <div className="flex items-center justify-between p-2 bg-orange-50 rounded">
                  <span>Emenda 2 - CC005/2023</span>
                  <Badge className="bg-orange-500">18/02</Badge>
                </div>
                <div className="flex items-center justify-between p-2 bg-orange-50 rounded">
                  <span>Emenda Final - PE001</span>
                  <Badge className="bg-orange-500">26/02</Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={onVoltar}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Relatórios e Planilhas</h1>
            <p className="text-muted-foreground">Geração automática de relatórios e exportação de dados</p>
          </div>
        </div>
      </div>

      {/* Tabs de Navegação */}
      <Tabs value={tipoRelatorio} onValueChange={(value) => setTipoRelatorio(value as any)}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="dashboards" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Dashboards Visuais
          </TabsTrigger>
          <TabsTrigger value="planilhas" className="flex items-center gap-2">
            <FileSpreadsheet className="h-4 w-4" />
            Planilhas Automáticas
          </TabsTrigger>
          <TabsTrigger value="relatorios" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Relatórios Gerenciais
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dashboards">
          {renderDashboardsVisuais()}
        </TabsContent>

        <TabsContent value="planilhas">
          {renderPlanilhasAutomaticas()}
        </TabsContent>

        <TabsContent value="relatorios">
          {renderRelatoriosGerenciais()}
        </TabsContent>
      </Tabs>
    </div>
  )
}