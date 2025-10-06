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
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Checkbox } from '@/components/ui/checkbox'
import { 
  Package, 
  DollarSign, 
  Calculator, 
  Warehouse, 
  Truck, 
  FileText,
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Calendar,
  Upload,
  BarChart3,
  History,
  Target
} from 'lucide-react'
import { Produto } from '@/lib/types'

interface ProdutosServicosProps {
  onVoltar: () => void
}

export default function ProdutosServicos({ onVoltar }: ProdutosServicosProps) {
  const [produtos] = useState<Produto[]>([
    {
      id: '1',
      codigoInterno: 'PROD001',
      codigoBarras: '7891234567890',
      nome: 'Notebook Dell Inspiron 15',
      descricao: 'Notebook Dell Inspiron 15 3000, Intel Core i5, 8GB RAM, 256GB SSD',
      categoria: 'Informática',
      subcategoria: 'Notebooks',
      unidadeMedida: 'UN',
      marca: 'Dell',
      modelo: 'Inspiron 15 3000',
      fabricante: 'Dell Technologies',
      precificacao: {
        custoAquisicao: 2500,
        precoVendaBase: 3200,
        margemLucro: 28,
        markup: 1.28,
        freteIncluso: false,
        valorFrete: 50,
        precoFinalComImpostos: 3680,
        precosEspeciais: [
          { quantidadeMinima: 5, preco: 3100 },
          { quantidadeMinima: 10, preco: 3000 }
        ],
        tabelaDescontos: [
          { quantidadeMinima: 2, desconto: 2 },
          { quantidadeMinima: 5, desconto: 5 }
        ]
      },
      tributacao: {
        ncm: '8471.30.12',
        cest: '01.001.00',
        origemMercadoria: '1',
        icms: {
          aliquota: 18,
          cst: '000',
          baseCalculo: 3200,
          valor: 576,
          fcp: 32
        },
        ipi: {
          cst: '50',
          aliquota: 0,
          valor: 0
        },
        pisCofins: {
          cstPis: '01',
          aliquotaPis: 1.65,
          valorPis: 52.8,
          cstCofins: '01',
          aliquotaCofins: 7.6,
          valorCofins: 243.2
        },
        impostosFederais: {
          irpj: 96,
          csll: 57.6
        }
      },
      estoque: {
        quantidade: 15,
        estoqueMinimo: 5,
        estoqueMaximo: 50,
        localizacao: 'A1-B2-C3',
        controle: 'FIFO'
      },
      fornecimento: {
        prazoEntrega: 7,
        fornecedoresVinculados: ['FORN001', 'FORN002'],
        ultimaCompra: {
          data: new Date('2024-01-15'),
          valor: 2500
        }
      },
      documentacao: {
        fotos: ['foto1.jpg', 'foto2.jpg'],
        catalogos: ['catalogo_dell.pdf'],
        certificados: ['anatel.pdf'],
        manuais: ['manual_usuario.pdf']
      }
    },
    {
      id: '2',
      codigoInterno: 'PROD002',
      nome: 'Mouse Óptico USB',
      descricao: 'Mouse óptico com fio USB, 1000 DPI, ergonômico',
      categoria: 'Informática',
      subcategoria: 'Periféricos',
      unidadeMedida: 'UN',
      marca: 'Logitech',
      modelo: 'B100',
      fabricante: 'Logitech',
      precificacao: {
        custoAquisicao: 25,
        precoVendaBase: 35,
        margemLucro: 40,
        markup: 1.4,
        freteIncluso: true,
        precoFinalComImpostos: 42,
        precosEspeciais: [
          { quantidadeMinima: 10, preco: 32 },
          { quantidadeMinima: 50, preco: 30 }
        ],
        tabelaDescontos: [
          { quantidadeMinima: 5, desconto: 5 },
          { quantidadeMinima: 20, desconto: 10 }
        ]
      },
      tributacao: {
        ncm: '8471.60.52',
        origemMercadoria: '1',
        icms: {
          aliquota: 18,
          cst: '000',
          baseCalculo: 35,
          valor: 6.3
        },
        ipi: {
          cst: '50',
          aliquota: 0,
          valor: 0
        },
        pisCofins: {
          cstPis: '01',
          aliquotaPis: 1.65,
          valorPis: 0.58,
          cstCofins: '01',
          aliquotaCofins: 7.6,
          valorCofins: 2.66
        },
        impostosFederais: {
          irpj: 1.05,
          csll: 0.63
        }
      },
      estoque: {
        quantidade: 120,
        estoqueMinimo: 20,
        estoqueMaximo: 200,
        localizacao: 'A2-B1-C1',
        controle: 'FIFO'
      },
      fornecimento: {
        prazoEntrega: 3,
        fornecedoresVinculados: ['FORN003'],
        ultimaCompra: {
          data: new Date('2024-01-20'),
          valor: 25
        }
      },
      documentacao: {
        fotos: ['mouse1.jpg'],
        catalogos: ['catalogo_logitech.pdf'],
        certificados: ['anatel_mouse.pdf'],
        manuais: []
      }
    }
  ])

  const [filtros, setFiltros] = useState({
    busca: '',
    categoria: '',
    status: ''
  })

  const [showCadastro, setShowCadastro] = useState(false)
  const [showHistoricoCotacoes, setShowHistoricoCotacoes] = useState(false)
  const [produtoSelecionado, setProdutoSelecionado] = useState<Produto | null>(null)

  // Estados para o formulário de precificação
  const [precificacao, setPrecificacao] = useState({
    precoCusto: 150.00,
    dataCotacao: '2025-10-06',
    fornecedor: 'Fornecedor ABC Ltda',
    validadeAte: '2025-11-06',
    precoMinimo: 195.00,
    precoMaximo: 280.00,
    precoSugerido: 237.50,
    precoVendaAtual: 220.00,
    freteIncluso: true,
    valorFrete: 25.00
  })

  const produtosFiltrados = produtos.filter(produto => {
    const matchBusca = produto.nome.toLowerCase().includes(filtros.busca.toLowerCase()) ||
                      produto.codigoInterno.toLowerCase().includes(filtros.busca.toLowerCase())
    const matchCategoria = !filtros.categoria || produto.categoria === filtros.categoria
    return matchBusca && matchCategoria
  })

  const estatisticas = {
    totalProdutos: produtos.length,
    produtosAtivos: produtos.length,
    valorTotalEstoque: produtos.reduce((acc, p) => acc + (p.precificacao.custoAquisicao * p.estoque.quantidade), 0),
    produtosEstoqueBaixo: produtos.filter(p => p.estoque.quantidade <= p.estoque.estoqueMinimo).length
  }

  const getStatusEstoque = (produto: Produto) => {
    if (produto.estoque.quantidade <= produto.estoque.estoqueMinimo) {
      return { status: 'Baixo', color: 'bg-red-100 text-red-800', icon: <AlertTriangle className="h-3 w-3" /> }
    } else if (produto.estoque.quantidade <= produto.estoque.estoqueMinimo * 2) {
      return { status: 'Médio', color: 'bg-yellow-100 text-yellow-800', icon: <TrendingDown className="h-3 w-3" /> }
    } else {
      return { status: 'Alto', color: 'bg-green-100 text-green-800', icon: <TrendingUp className="h-3 w-3" /> }
    }
  }

  const calcularMargem = (precoVenda: number, precoCusto: number, impostos: number = 0) => {
    return ((precoVenda - precoCusto - impostos) / precoVenda) * 100
  }

  const calcularLucro = (precoVenda: number, precoCusto: number, impostos: number = 0) => {
    return precoVenda - precoCusto - impostos
  }

  // Dados do histórico de cotações
  const historicoCotacoes = [
    {
      data: '06/10/2025',
      fornecedor: 'Fornec. ABC',
      preco: 150.00,
      variacao: null,
      usuario: 'João Silva',
      documento: 'Orçamento'
    },
    {
      data: '15/09/2025',
      fornecedor: 'Fornec. XYZ',
      preco: 148.00,
      variacao: -1.3,
      usuario: 'Maria',
      documento: 'NF 12345'
    },
    {
      data: '20/08/2025',
      fornecedor: 'Fornec. ABC',
      preco: 155.00,
      variacao: 4.7,
      usuario: 'João Silva',
      documento: 'Orçamento'
    },
    {
      data: '10/07/2025',
      fornecedor: 'Fornec. 123',
      preco: 152.00,
      variacao: -1.9,
      usuario: 'Pedro',
      documento: 'NF 98765'
    },
    {
      data: '05/06/2025',
      fornecedor: 'Fornec. ABC',
      preco: 160.00,
      variacao: 5.3,
      usuario: 'João Silva',
      documento: 'Cotação'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Produtos e Serviços</h2>
          <p className="text-muted-foreground">Gerencie seu catálogo de produtos e serviços</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onVoltar}>
            Voltar
          </Button>
          <Dialog open={showCadastro} onOpenChange={setShowCadastro}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Novo Produto
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Cadastro de Produto - Precificação Avançada</DialogTitle>
                <DialogDescription>
                  Configure os preços e margens do produto com análise detalhada
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                {/* Seção de Precificação Avançada */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <DollarSign className="h-5 w-5" />
                      PRECIFICAÇÃO DO PRODUTO
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    
                    {/* Custo e Cotação */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <BarChart3 className="h-5 w-5" />
                        CUSTO E COTAÇÃO
                      </h3>
                      <Card>
                        <CardContent className="p-4 space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="precoCusto">Preço de Custo (R$)</Label>
                              <Input
                                id="precoCusto"
                                type="number"
                                value={precificacao.precoCusto}
                                onChange={(e) => setPrecificacao({...precificacao, precoCusto: parseFloat(e.target.value)})}
                                step="0.01"
                              />
                            </div>
                            <div>
                              <Label htmlFor="dataCotacao">Data da Cotação</Label>
                              <div className="relative">
                                <Input
                                  id="dataCotacao"
                                  type="date"
                                  value={precificacao.dataCotacao}
                                  onChange={(e) => setPrecificacao({...precificacao, dataCotacao: e.target.value})}
                                />
                                <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                              </div>
                            </div>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="fornecedor">Fornecedor</Label>
                              <Select value={precificacao.fornecedor} onValueChange={(value) => setPrecificacao({...precificacao, fornecedor: value})}>
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Fornecedor ABC Ltda">Fornecedor ABC Ltda</SelectItem>
                                  <SelectItem value="Fornecedor XYZ">Fornecedor XYZ</SelectItem>
                                  <SelectItem value="Fornecedor 123">Fornecedor 123</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <Label htmlFor="validadeAte">Válido até</Label>
                              <div className="relative">
                                <Input
                                  id="validadeAte"
                                  type="date"
                                  value={precificacao.validadeAte}
                                  onChange={(e) => setPrecificacao({...precificacao, validadeAte: e.target.value})}
                                />
                                <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                              </div>
                            </div>
                          </div>
                          <div>
                            <Label htmlFor="documento">Nota Fiscal/Orçamento</Label>
                            <div className="flex items-center gap-2">
                              <Input id="documento" type="file" accept=".pdf,.jpg,.png" />
                              <Upload className="h-4 w-4 text-muted-foreground" />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Limites de Venda */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <Target className="h-5 w-5" />
                        LIMITES DE VENDA
                      </h3>
                      <Card>
                        <CardContent className="p-4 space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="p-4 border rounded-lg bg-red-50">
                              <Label htmlFor="precoMinimo" className="text-red-700 font-semibold">Preço MÍNIMO de Venda</Label>
                              <Input
                                id="precoMinimo"
                                type="number"
                                value={precificacao.precoMinimo}
                                onChange={(e) => setPrecificacao({...precificacao, precoMinimo: parseFloat(e.target.value)})}
                                step="0.01"
                                className="mt-1 border-red-200"
                              />
                              <div className="mt-2 text-sm text-red-600">
                                <p>Margem mínima: {calcularMargem(precificacao.precoMinimo, precificacao.precoCusto).toFixed(1)}%</p>
                                <p>Lucro: R$ {calcularLucro(precificacao.precoMinimo, precificacao.precoCusto).toFixed(2)}</p>
                              </div>
                            </div>

                            <div className="p-4 border rounded-lg bg-green-50">
                              <Label htmlFor="precoMaximo" className="text-green-700 font-semibold">Preço MÁXIMO de Venda</Label>
                              <Input
                                id="precoMaximo"
                                type="number"
                                value={precificacao.precoMaximo}
                                onChange={(e) => setPrecificacao({...precificacao, precoMaximo: parseFloat(e.target.value)})}
                                step="0.01"
                                className="mt-1 border-green-200"
                              />
                              <div className="mt-2 text-sm text-green-600">
                                <p>Margem máxima: {calcularMargem(precificacao.precoMaximo, precificacao.precoCusto).toFixed(1)}%</p>
                                <p>Lucro: R$ {calcularLucro(precificacao.precoMaximo, precificacao.precoCusto).toFixed(2)}</p>
                              </div>
                            </div>

                            <div className="p-4 border rounded-lg bg-yellow-50">
                              <Label htmlFor="precoSugerido" className="text-yellow-700 font-semibold">Preço SUGERIDO</Label>
                              <Input
                                id="precoSugerido"
                                type="number"
                                value={precificacao.precoSugerido}
                                onChange={(e) => setPrecificacao({...precificacao, precoSugerido: parseFloat(e.target.value)})}
                                step="0.01"
                                className="mt-1 border-yellow-200"
                              />
                              <div className="mt-2 text-sm text-yellow-600">
                                <p>Margem sugerida: {calcularMargem(precificacao.precoSugerido, precificacao.precoCusto).toFixed(1)}%</p>
                                <p>Lucro: R$ {calcularLucro(precificacao.precoSugerido, precificacao.precoCusto).toFixed(2)}</p>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Preço Praticado */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <DollarSign className="h-5 w-5" />
                        PREÇO PRATICADO
                      </h3>
                      <Card>
                        <CardContent className="p-4 space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="precoVendaAtual">Preço de Venda Atual</Label>
                              <Input
                                id="precoVendaAtual"
                                type="number"
                                value={precificacao.precoVendaAtual}
                                onChange={(e) => setPrecificacao({...precificacao, precoVendaAtual: parseFloat(e.target.value)})}
                                step="0.01"
                              />
                            </div>
                            <div>
                              <Label>Última alteração</Label>
                              <p className="text-sm text-muted-foreground mt-2">05/10/2025 14:30</p>
                              <p className="text-sm text-muted-foreground">Alterado por: João Silva</p>
                            </div>
                          </div>

                          <div className="space-y-3">
                            <div className="flex items-center space-x-2">
                              <Checkbox 
                                id="freteIncluso" 
                                checked={precificacao.freteIncluso}
                                onCheckedChange={(checked) => setPrecificacao({...precificacao, freteIncluso: checked as boolean})}
                              />
                              <Label htmlFor="freteIncluso">Incluir frete no preço</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox 
                                id="freteSeparado" 
                                checked={!precificacao.freteIncluso}
                                onCheckedChange={(checked) => setPrecificacao({...precificacao, freteIncluso: !(checked as boolean)})}
                              />
                              <Label htmlFor="freteSeparado">Calcular frete separadamente</Label>
                            </div>
                          </div>

                          {!precificacao.freteIncluso && (
                            <div>
                              <Label htmlFor="valorFrete">Valor do frete (se separado)</Label>
                              <Input
                                id="valorFrete"
                                type="number"
                                value={precificacao.valorFrete}
                                onChange={(e) => setPrecificacao({...precificacao, valorFrete: parseFloat(e.target.value)})}
                                step="0.01"
                              />
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </div>

                    {/* Análise de Viabilidade */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <BarChart3 className="h-5 w-5" />
                        ANÁLISE DE VIABILIDADE
                      </h3>
                      <Card>
                        <CardContent className="p-4">
                          <div className="flex items-center gap-2 mb-4">
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            <span className="font-semibold">SAUDÁVEL</span>
                          </div>
                          <ul className="space-y-2 text-sm mb-4">
                            <li className="flex items-center gap-2">
                              <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                              Margem dentro do esperado
                            </li>
                            <li className="flex items-center gap-2">
                              <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                              Preço competitivo
                            </li>
                            <li className="flex items-center gap-2">
                              <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                              Última cotação há 5 dias
                            </li>
                          </ul>
                          <div className="border-t pt-4">
                            <p className="font-semibold mb-2">Alertas:</p>
                            <div className="flex items-center gap-2 text-yellow-600">
                              <AlertTriangle className="h-4 w-4" />
                              <span className="text-sm">Validade da cotação vence em 31 dias</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Botões de Ação */}
                    <div className="flex gap-3 pt-4">
                      <Button 
                        variant="outline" 
                        onClick={() => setShowHistoricoCotacoes(true)}
                        className="flex items-center gap-2"
                      >
                        <History className="h-4 w-4" />
                        Ver Histórico de Cotações
                      </Button>
                      <Button variant="outline" className="flex items-center gap-2">
                        <Calculator className="h-4 w-4" />
                        Simular Cenários
                      </Button>
                      <Button className="flex items-center gap-2">
                        <Package className="h-4 w-4" />
                        Salvar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Dialog do Histórico de Cotações */}
      <Dialog open={showHistoricoCotacoes} onOpenChange={setShowHistoricoCotacoes}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Histórico de Cotações - Notebook Dell Inspiron 15</DialogTitle>
            <DialogDescription>
              Acompanhe a evolução dos preços e tendências de mercado
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Tabela de Histórico */}
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-semibold">Data</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold">Fornecedor</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold">Preço</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold">Variação</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold">Usuário</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold">Documento</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {historicoCotacoes.map((cotacao, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm">{cotacao.data}</td>
                          <td className="px-4 py-3 text-sm">{cotacao.fornecedor}</td>
                          <td className="px-4 py-3 text-sm font-medium">R$ {cotacao.preco.toFixed(2)}</td>
                          <td className="px-4 py-3 text-sm">
                            {cotacao.variacao ? (
                              <span className={`flex items-center gap-1 ${cotacao.variacao > 0 ? 'text-red-600' : 'text-green-600'}`}>
                                {cotacao.variacao > 0 ? '▲' : '▼'} {Math.abs(cotacao.variacao)}%
                              </span>
                            ) : (
                              <span className="text-gray-400">-</span>
                            )}
                          </td>
                          <td className="px-4 py-3 text-sm">{cotacao.usuario}</td>
                          <td className="px-4 py-3 text-sm">
                            <span className="flex items-center gap-1">
                              <FileText className="h-3 w-3" />
                              {cotacao.documento}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Análise Estatística */}
            <Card>
              <CardContent className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-sm text-muted-foreground">Menor preço</p>
                    <p className="text-lg font-bold text-green-600">R$ 148,00</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Maior preço</p>
                    <p className="text-lg font-bold text-red-600">R$ 160,00</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Preço médio</p>
                    <p className="text-lg font-bold">R$ 153,00</p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t">
                  <div className="flex items-center gap-2">
                    <TrendingDown className="h-4 w-4 text-blue-500" />
                    <span className="text-sm">
                      <strong>Tendência:</strong> Estável com leve queda (-1,5% nos últimos 120 dias)
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </DialogContent>
      </Dialog>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total de Produtos</p>
                <p className="text-2xl font-bold">{estatisticas.totalProdutos}</p>
              </div>
              <Package className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Produtos Ativos</p>
                <p className="text-2xl font-bold">{estatisticas.produtosAtivos}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Valor do Estoque</p>
                <p className="text-2xl font-bold">R$ {(estatisticas.valorTotalEstoque / 1000).toFixed(0)}K</p>
              </div>
              <DollarSign className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Estoque Baixo</p>
                <p className="text-2xl font-bold text-red-600">{estatisticas.produtosEstoqueBaixo}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por nome ou código..."
                  value={filtros.busca}
                  onChange={(e) => setFiltros({...filtros, busca: e.target.value})}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filtros.categoria} onValueChange={(value) => setFiltros({...filtros, categoria: value})}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Todas as categorias</SelectItem>
                <SelectItem value="Informática">Informática</SelectItem>
                <SelectItem value="Escritório">Escritório</SelectItem>
                <SelectItem value="Limpeza">Limpeza</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filtros
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Produtos */}
      <div className="space-y-4">
        {produtosFiltrados.map((produto) => {
          const statusEstoque = getStatusEstoque(produto)
          return (
            <Card key={produto.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold">{produto.nome}</h3>
                      <Badge variant="outline">{produto.codigoInterno}</Badge>
                      <Badge className={statusEstoque.color}>
                        <span className="flex items-center gap-1">
                          {statusEstoque.icon}
                          {statusEstoque.status}
                        </span>
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{produto.descricao}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-xs text-muted-foreground">Categoria</p>
                        <p className="font-medium">{produto.categoria} / {produto.subcategoria}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Preço de Venda</p>
                        <p className="font-medium text-green-600">R$ {produto.precificacao.precoVendaBase.toLocaleString('pt-BR')}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Estoque</p>
                        <p className="font-medium">{produto.estoque.quantidade} {produto.unidadeMedida}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Margem</p>
                        <p className="font-medium text-blue-600">{produto.precificacao.margemLucro}%</p>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-xs text-muted-foreground">Tributação</p>
                          <p>NCM: {produto.tributacao.ncm}</p>
                          <p>ICMS: {produto.tributacao.icms.aliquota}%</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Fornecimento</p>
                          <p>Prazo: {produto.fornecimento.prazoEntrega} dias</p>
                          <p>Fornecedores: {produto.fornecimento.fornecedoresVinculados.length}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Localização</p>
                          <p>{produto.estoque.localizacao}</p>
                          <p>Min: {produto.estoque.estoqueMinimo} / Max: {produto.estoque.estoqueMaximo}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 ml-4">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        setProdutoSelecionado(produto)
                        setShowCadastro(true)
                      }}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Calculator className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Warehouse className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {produtosFiltrados.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Nenhum produto encontrado</h3>
            <p className="text-muted-foreground mb-4">
              Não encontramos produtos que correspondam aos filtros aplicados.
            </p>
            <Button onClick={() => setShowCadastro(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Primeiro Produto
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}