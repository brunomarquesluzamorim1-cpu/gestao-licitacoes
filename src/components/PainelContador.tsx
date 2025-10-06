'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  ArrowLeft, 
  Calculator,
  TrendingUp,
  TrendingDown,
  DollarSign,
  FileText,
  Calendar,
  AlertTriangle,
  Download,
  BarChart3,
  PieChart,
  Building2,
  Receipt,
  Zap,
  CheckCircle
} from 'lucide-react'

interface PainelContadorProps {
  onVoltar: () => void
}

export default function PainelContador({ onVoltar }: PainelContadorProps) {
  const [abaSelecionada, setAbaSelecionada] = useState('dashboard')

  // Dados mockados para o dashboard
  const resumoFinanceiro = {
    receitaBruta: 180000,
    impostos: 45000,
    lucroLiquido: 45000,
    margemLucro: 25
  }

  const composicaoReceita = {
    licitacoes: 75,
    indenizatorios: 25
  }

  const topOrgaos = [
    { nome: 'Prefeitura Municipal de São Paulo', valor: 85000 },
    { nome: 'Governo do Estado de SP', valor: 65000 },
    { nome: 'Ministério da Saúde', valor: 30000 },
    { nome: 'Secretaria de Educação', valor: 25000 },
    { nome: 'INSS', valor: 15000 }
  ]

  const impostosDetalhados = [
    { imposto: 'ICMS', baseCalculo: 120000, aliquota: 18, valor: 21600, vencimento: '2024-02-15' },
    { imposto: 'PIS', baseCalculo: 180000, aliquota: 1.65, valor: 2970, vencimento: '2024-02-20' },
    { imposto: 'COFINS', baseCalculo: 180000, aliquota: 7.6, valor: 13680, vencimento: '2024-02-20' },
    { imposto: 'IRPJ', baseCalculo: 45000, aliquota: 15, valor: 6750, vencimento: '2024-03-31' },
    { imposto: 'CSLL', baseCalculo: 45000, aliquota: 9, valor: 4050, vencimento: '2024-03-31' },
    { imposto: 'ISS', baseCalculo: 25000, aliquota: 5, valor: 1250, vencimento: '2024-02-10' }
  ]

  const documentosFiscais = {
    notasEmpenho: 12,
    recibosEntrega: 8,
    notasFiscais: 15
  }

  const alertasContabeis = [
    { tipo: 'warning', mensagem: 'ISS vence em 3 dias', prioridade: 'Alta' },
    { tipo: 'info', mensagem: 'SPED Fiscal pendente de envio', prioridade: 'Média' },
    { tipo: 'warning', mensagem: 'Conciliação bancária pendente', prioridade: 'Alta' },
    { tipo: 'info', mensagem: 'Backup dos dados realizado', prioridade: 'Baixa' }
  ]

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Resumo Financeiro do Mês */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receita Bruta</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ {resumoFinanceiro.receitaBruta.toLocaleString('pt-BR')}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              +12% vs mês anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Impostos</CardTitle>
            <Calculator className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ {resumoFinanceiro.impostos.toLocaleString('pt-BR')}</div>
            <p className="text-xs text-muted-foreground">
              25% da receita bruta
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lucro Líquido</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ {resumoFinanceiro.lucroLiquido.toLocaleString('pt-BR')}</div>
            <p className="text-xs text-muted-foreground">
              Margem de {resumoFinanceiro.margemLucro}%
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Margem Líquida</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{resumoFinanceiro.margemLucro}%</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              +2% vs mês anterior
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Composição de Receita */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              Composição de Receita
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm">Licitações</span>
                </div>
                <div className="text-right">
                  <div className="font-medium">{composicaoReceita.licitacoes}%</div>
                  <div className="text-xs text-gray-500">R$ 135.000</div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm">Indenizatórios</span>
                </div>
                <div className="text-right">
                  <div className="font-medium">{composicaoReceita.indenizatorios}%</div>
                  <div className="text-xs text-gray-500">R$ 45.000</div>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-l-full" style={{ width: `${composicaoReceita.licitacoes}%` }}></div>
                <div className="bg-green-500 h-2 rounded-r-full" style={{ width: `${composicaoReceita.indenizatorios}%`, marginTop: '-8px', marginLeft: `${composicaoReceita.licitacoes}%` }}></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Top 5 Órgãos Clientes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topOrgaos.map((orgao, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs font-medium">
                      {index + 1}
                    </div>
                    <span className="text-sm truncate max-w-[200px]">{orgao.nome}</span>
                  </div>
                  <div className="font-medium text-sm">
                    R$ {orgao.valor.toLocaleString('pt-BR')}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Impostos Detalhados */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Impostos Detalhados - Janeiro 2024
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Imposto</th>
                  <th className="text-right p-2">Base de Cálculo</th>
                  <th className="text-right p-2">Alíquota</th>
                  <th className="text-right p-2">Valor do Mês</th>
                  <th className="text-left p-2">Vencimento</th>
                  <th className="text-center p-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {impostosDetalhados.map((imposto, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-2 font-medium">{imposto.imposto}</td>
                    <td className="p-2 text-right">R$ {imposto.baseCalculo.toLocaleString('pt-BR')}</td>
                    <td className="p-2 text-right">{imposto.aliquota}%</td>
                    <td className="p-2 text-right font-medium">R$ {imposto.valor.toLocaleString('pt-BR')}</td>
                    <td className="p-2">{new Date(imposto.vencimento).toLocaleDateString('pt-BR')}</td>
                    <td className="p-2 text-center">
                      {new Date(imposto.vencimento) < new Date() ? (
                        <Badge variant="destructive">Vencido</Badge>
                      ) : new Date(imposto.vencimento).getTime() - new Date().getTime() < 7 * 24 * 60 * 60 * 1000 ? (
                        <Badge variant="secondary">Vencendo</Badge>
                      ) : (
                        <Badge variant="outline">Em Dia</Badge>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t bg-gray-50">
                  <td className="p-2 font-bold">Total</td>
                  <td className="p-2"></td>
                  <td className="p-2"></td>
                  <td className="p-2 text-right font-bold">
                    R$ {impostosDetalhados.reduce((total, imp) => total + imp.valor, 0).toLocaleString('pt-BR')}
                  </td>
                  <td className="p-2"></td>
                  <td className="p-2"></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Documentos Fiscais e Alertas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Documentos Fiscais Emitidos
            </CardTitle>
            <CardDescription>Janeiro 2024</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Receipt className="h-4 w-4 text-blue-500" />
                  <span className="text-sm">Notas de Empenho</span>
                </div>
                <div className="font-medium">{documentosFiscais.notasEmpenho}</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Recibos de Entrega</span>
                </div>
                <div className="font-medium">{documentosFiscais.recibosEntrega}</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-purple-500" />
                  <span className="text-sm">Notas Fiscais Eletrônicas</span>
                </div>
                <div className="font-medium">{documentosFiscais.notasFiscais}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Alertas Contábeis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {alertasContabeis.map((alerta, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    {alerta.tipo === 'warning' && <AlertTriangle className="h-4 w-4 text-yellow-500" />}
                    {alerta.tipo === 'info' && <CheckCircle className="h-4 w-4 text-blue-500" />}
                    <span className="text-sm">{alerta.mensagem}</span>
                  </div>
                  <Badge variant={alerta.prioridade === 'Alta' ? 'destructive' : alerta.prioridade === 'Média' ? 'secondary' : 'outline'}>
                    {alerta.prioridade}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Ações Rápidas */}
      <Card>
        <CardHeader>
          <CardTitle>Ações Rápidas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
            <Button variant="outline" className="flex flex-col items-center gap-2 h-20">
              <BarChart3 className="h-5 w-5" />
              <span className="text-xs">Gerar DRE</span>
            </Button>
            <Button variant="outline" className="flex flex-col items-center gap-2 h-20">
              <Calculator className="h-5 w-5" />
              <span className="text-xs">Relatório Fiscal</span>
            </Button>
            <Button variant="outline" className="flex flex-col items-center gap-2 h-20">
              <Download className="h-5 w-5" />
              <span className="text-xs">Exportar Movimentações</span>
            </Button>
            <Button variant="outline" className="flex flex-col items-center gap-2 h-20">
              <FileText className="h-5 w-5" />
              <span className="text-xs">Livro Razão</span>
            </Button>
            <Button variant="outline" className="flex flex-col items-center gap-2 h-20">
              <Zap className="h-5 w-5" />
              <span className="text-xs">SPED Fiscal</span>
            </Button>
            <Button variant="outline" className="flex flex-col items-center gap-2 h-20">
              <TrendingUp className="h-5 w-5" />
              <span className="text-xs">Análise Tributária</span>
            </Button>
            <Button variant="outline" className="flex flex-col items-center gap-2 h-20">
              <Calendar className="h-5 w-5" />
              <span className="text-xs">Obrigações</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderRelatoriosContabeis = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Relatórios Contábeis</h2>
        <p className="text-gray-600">Demonstrações e relatórios contábeis obrigatórios</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* DRE */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-blue-500" />
              DRE
            </CardTitle>
            <CardDescription>Demonstração do Resultado do Exercício</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div>• Receita Bruta</div>
              <div>• Deduções e Impostos</div>
              <div>• Receita Líquida</div>
              <div>• Custos e Despesas</div>
              <div>• Lucro Líquido</div>
            </div>
            <div className="mt-4 flex gap-2">
              <Button size="sm" variant="outline">
                <Eye className="h-3 w-3 mr-1" />
                Visualizar
              </Button>
              <Button size="sm">
                <Download className="h-3 w-3 mr-1" />
                Gerar
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Fluxo de Caixa */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
              Fluxo de Caixa
            </CardTitle>
            <CardDescription>Movimentação financeira detalhada</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div>• Entradas por período</div>
              <div>• Saídas por categoria</div>
              <div>• Saldo acumulado</div>
              <div>• Projeções futuras</div>
              <div>• Análise de tendências</div>
            </div>
            <div className="mt-4 flex gap-2">
              <Button size="sm" variant="outline">
                <Eye className="h-3 w-3 mr-1" />
                Visualizar
              </Button>
              <Button size="sm">
                <Download className="h-3 w-3 mr-1" />
                Gerar
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Balancete */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5 text-purple-500" />
              Balancete
            </CardTitle>
            <CardDescription>Balancete de verificação mensal</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div>• Contas contábeis</div>
              <div>• Saldos anteriores</div>
              <div>• Movimentação do período</div>
              <div>• Saldos atuais</div>
              <div>• Conferência de débitos/créditos</div>
            </div>
            <div className="mt-4 flex gap-2">
              <Button size="sm" variant="outline">
                <Eye className="h-3 w-3 mr-1" />
                Visualizar
              </Button>
              <Button size="sm">
                <Download className="h-3 w-3 mr-1" />
                Gerar
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Livro Razão */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-orange-500" />
              Livro Razão
            </CardTitle>
            <CardDescription>Movimentação por conta contábil</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div>• Histórico por conta</div>
              <div>• Lançamentos detalhados</div>
              <div>• Saldos progressivos</div>
              <div>• Filtros por período</div>
              <div>• Rastreabilidade completa</div>
            </div>
            <div className="mt-4 flex gap-2">
              <Button size="sm" variant="outline">
                <Eye className="h-3 w-3 mr-1" />
                Visualizar
              </Button>
              <Button size="sm">
                <Download className="h-3 w-3 mr-1" />
                Gerar
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Livro Diário */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-red-500" />
              Livro Diário
            </CardTitle>
            <CardDescription>Registro cronológico dos lançamentos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div>• Ordem cronológica</div>
              <div>• Todos os lançamentos</div>
              <div>• Históricos completos</div>
              <div>• Numeração sequencial</div>
              <div>• Assinatura digital</div>
            </div>
            <div className="mt-4 flex gap-2">
              <Button size="sm" variant="outline">
                <Eye className="h-3 w-3 mr-1" />
                Visualizar
              </Button>
              <Button size="sm">
                <Download className="h-3 w-3 mr-1" />
                Gerar
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* SPED Fiscal */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-yellow-500" />
              SPED Fiscal
            </CardTitle>
            <CardDescription>Sistema Público de Escrituração Digital</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div>• Bloco 0 - Abertura</div>
              <div>• Bloco C - Documentos Fiscais</div>
              <div>• Bloco E - Apuração ICMS/IPI</div>
              <div>• Bloco H - Inventário</div>
              <div>• Validação automática</div>
            </div>
            <div className="mt-4 flex gap-2">
              <Button size="sm" variant="outline">
                <Eye className="h-3 w-3 mr-1" />
                Visualizar
              </Button>
              <Button size="sm">
                <Download className="h-3 w-3 mr-1" />
                Gerar
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Movimentações Bancárias */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              Movimentações Bancárias
            </CardTitle>
            <CardDescription>Conciliação e extratos bancários</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div>• Extratos importados</div>
              <div>• Conciliação automática</div>
              <div>• Pendências identificadas</div>
              <div>• Saldos reconciliados</div>
              <div>• Relatório de diferenças</div>
            </div>
            <div className="mt-4 flex gap-2">
              <Button size="sm" variant="outline">
                <Eye className="h-3 w-3 mr-1" />
                Visualizar
              </Button>
              <Button size="sm">
                <Download className="h-3 w-3 mr-1" />
                Gerar
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Receitas por Órgão */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-indigo-500" />
              Receitas por Órgão
            </CardTitle>
            <CardDescription>Análise de faturamento por cliente</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div>• Ranking de clientes</div>
              <div>• Evolução temporal</div>
              <div>• Participação percentual</div>
              <div>• Sazonalidade</div>
              <div>• Projeções de receita</div>
            </div>
            <div className="mt-4 flex gap-2">
              <Button size="sm" variant="outline">
                <Eye className="h-3 w-3 mr-1" />
                Visualizar
              </Button>
              <Button size="sm">
                <Download className="h-3 w-3 mr-1" />
                Gerar
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Análise Tributária */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5 text-pink-500" />
              Análise Tributária
            </CardTitle>
            <CardDescription>Otimização da carga tributária</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div>• Carga tributária efetiva</div>
              <div>• Comparativo de regimes</div>
              <div>• Oportunidades de economia</div>
              <div>• Simulações fiscais</div>
              <div>• Planejamento tributário</div>
            </div>
            <div className="mt-4 flex gap-2">
              <Button size="sm" variant="outline">
                <Eye className="h-3 w-3 mr-1" />
                Visualizar
              </Button>
              <Button size="sm">
                <Download className="h-3 w-3 mr-1" />
                Gerar
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={onVoltar}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Painel do Contador</h1>
          <p className="text-gray-600">Dashboard contábil e relatórios fiscais</p>
        </div>
      </div>

      <Tabs value={abaSelecionada} onValueChange={setAbaSelecionada}>
        <TabsList>
          <TabsTrigger value="dashboard">Dashboard Contábil</TabsTrigger>
          <TabsTrigger value="relatorios">Relatórios Contábeis</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard">
          {renderDashboard()}
        </TabsContent>

        <TabsContent value="relatorios">
          {renderRelatoriosContabeis()}
        </TabsContent>
      </Tabs>
    </div>
  )
}