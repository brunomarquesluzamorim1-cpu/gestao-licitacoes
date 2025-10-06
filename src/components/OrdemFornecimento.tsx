'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { 
  ArrowLeft, 
  Plus, 
  Trash2, 
  FileText, 
  Send, 
  Calendar,
  Building2,
  Package,
  Truck,
  CreditCard,
  Eye,
  Download,
  Clock,
  CheckCircle,
  AlertTriangle
} from 'lucide-react'

interface OrdemFornecimentoProps {
  onVoltar: () => void
}

interface ItemOrdem {
  id: string
  categoria: string
  produto: string
  codigo: string
  marca: string
  especificacoes: string
  quantidade: number
  valorUnitario: number
  total: number
}

interface OrdemFornecimento {
  id: string
  numero: string
  dataEmissao: Date
  orgaoContratante: string
  tipoProcesso: string
  documentoBase: string
  valorTotal: number
  status: 'Rascunho' | 'Enviada' | 'Aceita' | 'Em Execução' | 'Entregue'
  prazoEntrega: number
  dataLimite: Date
}

export default function OrdemFornecimento({ onVoltar }: OrdemFornecimentoProps) {
  const [abaSelecionada, setAbaSelecionada] = useState('lista')
  const [ordemSelecionada, setOrdemSelecionada] = useState<OrdemFornecimento | null>(null)
  const [modalNovaOrdem, setModalNovaOrdem] = useState(false)
  const [modalCronograma, setModalCronograma] = useState(false)

  // Dados mockados
  const ordensExistentes: OrdemFornecimento[] = [
    {
      id: '1',
      numero: 'OF-2024/000001',
      dataEmissao: new Date('2024-01-15'),
      orgaoContratante: 'Prefeitura Municipal de São Paulo',
      tipoProcesso: 'Licitação',
      documentoBase: 'Contrato 001/2024',
      valorTotal: 85000,
      status: 'Em Execução',
      prazoEntrega: 30,
      dataLimite: new Date('2024-02-15')
    },
    {
      id: '2',
      numero: 'OF-2024/000002',
      dataEmissao: new Date('2024-01-20'),
      orgaoContratante: 'Governo do Estado de SP',
      tipoProcesso: 'Dispensa',
      documentoBase: 'ARP 002/2024',
      valorTotal: 150000,
      status: 'Aceita',
      prazoEntrega: 45,
      dataLimite: new Date('2024-03-05')
    }
  ]

  const [itensOrdem, setItensOrdem] = useState<ItemOrdem[]>([])
  const [novoItem, setNovoItem] = useState<Partial<ItemOrdem>>({})

  const adicionarItem = () => {
    if (novoItem.produto && novoItem.quantidade && novoItem.valorUnitario) {
      const item: ItemOrdem = {
        id: Date.now().toString(),
        categoria: novoItem.categoria || '',
        produto: novoItem.produto,
        codigo: novoItem.codigo || '',
        marca: novoItem.marca || '',
        especificacoes: novoItem.especificacoes || '',
        quantidade: novoItem.quantidade,
        valorUnitario: novoItem.valorUnitario,
        total: novoItem.quantidade * novoItem.valorUnitario
      }
      setItensOrdem([...itensOrdem, item])
      setNovoItem({})
    }
  }

  const removerItem = (id: string) => {
    setItensOrdem(itensOrdem.filter(item => item.id !== id))
  }

  const valorTotalOrdem = itensOrdem.reduce((total, item) => total + item.total, 0)

  const renderListaOrdens = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Ordens de Fornecimento</h2>
          <p className="text-gray-600">Gerencie suas ordens de fornecimento</p>
        </div>
        <Button onClick={() => setModalNovaOrdem(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Nova Ordem
        </Button>
      </div>

      <div className="grid gap-4">
        {ordensExistentes.map((ordem) => (
          <Card key={ordem.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold text-lg">{ordem.numero}</h3>
                    <Badge variant={
                      ordem.status === 'Entregue' ? 'default' :
                      ordem.status === 'Em Execução' ? 'secondary' :
                      ordem.status === 'Aceita' ? 'outline' : 'destructive'
                    }>
                      {ordem.status}
                    </Badge>
                  </div>
                  <p className="text-gray-600">{ordem.orgaoContratante}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>Emissão: {ordem.dataEmissao.toLocaleDateString('pt-BR')}</span>
                    <span>Prazo: {ordem.prazoEntrega} dias</span>
                    <span>Valor: R$ {ordem.valorTotal.toLocaleString('pt-BR')}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-gray-500">{ordem.tipoProcesso}:</span>
                    <span className="font-medium">{ordem.documentoBase}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    Visualizar
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    PDF
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )

  const renderNovaOrdem = () => (
    <Dialog open={modalNovaOrdem} onOpenChange={setModalNovaOrdem}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Nova Ordem de Fornecimento</DialogTitle>
          <DialogDescription>
            Preencha os dados para gerar uma nova ordem de fornecimento
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Dados Básicos */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Dados Básicos
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label>Número da Ordem</Label>
                <Input value="OF-2024/000003" disabled />
              </div>
              <div>
                <Label>Ano/Exercício</Label>
                <Input value="2024" disabled />
              </div>
              <div>
                <Label>Data de Emissão</Label>
                <Input type="date" defaultValue={new Date().toISOString().split('T')[0]} />
              </div>
            </CardContent>
          </Card>

          {/* Órgão Contratante */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Órgão Contratante
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Órgão</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o órgão" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="prefeitura-sp">Prefeitura Municipal de São Paulo</SelectItem>
                    <SelectItem value="governo-sp">Governo do Estado de SP</SelectItem>
                    <SelectItem value="ministerio-saude">Ministério da Saúde</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Unidade Requisitante</Label>
                <Input placeholder="Ex: Secretaria de Educação" />
              </div>
              <div>
                <Label>Setor</Label>
                <Input placeholder="Ex: Departamento de Compras" />
              </div>
            </CardContent>
          </Card>

          {/* Processo e Vinculação */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Processo e Vinculação
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Tipo de Processo</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="licitacao">Licitação</SelectItem>
                      <SelectItem value="indenizatorio">Indenizatório</SelectItem>
                      <SelectItem value="dispensa">Dispensa</SelectItem>
                      <SelectItem value="inexigibilidade">Inexigibilidade</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Documento Base</Label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2">
                      <input type="radio" name="documentoBase" value="contrato" />
                      Contrato
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="radio" name="documentoBase" value="arp" />
                      ARP
                    </label>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Contrato/ARP</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o contrato/ARP" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="contrato-001">Contrato 001/2024 - Vigente até 31/12/2024 - Saldo: R$ 500.000</SelectItem>
                      <SelectItem value="arp-002">ARP 002/2024 - Vigente até 30/06/2024 - Saldo: R$ 300.000</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Modalidade</Label>
                  <Input placeholder="Ex: Pregão Eletrônico" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Nota de Empenho</Label>
                  <Input placeholder="Ex: NE 2024NE000123" />
                </div>
                <div>
                  <Label>Emenda de Entrega</Label>
                  <Input placeholder="Ex: Emenda 001/2024" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Produtos a Fornecer */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Produtos a Fornecer
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Adicionar Item */}
              <div className="grid grid-cols-1 md:grid-cols-6 gap-2 p-4 border rounded-lg bg-gray-50">
                <div>
                  <Label className="text-xs">Categoria</Label>
                  <Select value={novoItem.categoria} onValueChange={(value) => setNovoItem({...novoItem, categoria: value})}>
                    <SelectTrigger className="h-8">
                      <SelectValue placeholder="Categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="material-escritorio">Material de Escritório</SelectItem>
                      <SelectItem value="informatica">Informática</SelectItem>
                      <SelectItem value="limpeza">Material de Limpeza</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-xs">Produto</Label>
                  <Input 
                    className="h-8" 
                    placeholder="Nome do produto"
                    value={novoItem.produto || ''}
                    onChange={(e) => setNovoItem({...novoItem, produto: e.target.value})}
                  />
                </div>
                <div>
                  <Label className="text-xs">Código</Label>
                  <Input 
                    className="h-8" 
                    placeholder="Código"
                    value={novoItem.codigo || ''}
                    onChange={(e) => setNovoItem({...novoItem, codigo: e.target.value})}
                  />
                </div>
                <div>
                  <Label className="text-xs">Quantidade</Label>
                  <Input 
                    className="h-8" 
                    type="number" 
                    placeholder="Qtd"
                    value={novoItem.quantidade || ''}
                    onChange={(e) => setNovoItem({...novoItem, quantidade: Number(e.target.value)})}
                  />
                </div>
                <div>
                  <Label className="text-xs">Valor Unit.</Label>
                  <Input 
                    className="h-8" 
                    type="number" 
                    step="0.01" 
                    placeholder="R$ 0,00"
                    value={novoItem.valorUnitario || ''}
                    onChange={(e) => setNovoItem({...novoItem, valorUnitario: Number(e.target.value)})}
                  />
                </div>
                <div className="flex items-end">
                  <Button size="sm" onClick={adicionarItem} className="h-8">
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
              </div>

              {/* Lista de Itens */}
              {itensOrdem.length > 0 && (
                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left p-2 text-sm">Categoria</th>
                        <th className="text-left p-2 text-sm">Produto</th>
                        <th className="text-left p-2 text-sm">Código</th>
                        <th className="text-right p-2 text-sm">Qtd</th>
                        <th className="text-right p-2 text-sm">Valor Unit.</th>
                        <th className="text-right p-2 text-sm">Total</th>
                        <th className="text-center p-2 text-sm">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {itensOrdem.map((item) => (
                        <tr key={item.id} className="border-t">
                          <td className="p-2 text-sm">{item.categoria}</td>
                          <td className="p-2 text-sm">{item.produto}</td>
                          <td className="p-2 text-sm">{item.codigo}</td>
                          <td className="p-2 text-sm text-right">{item.quantidade}</td>
                          <td className="p-2 text-sm text-right">R$ {item.valorUnitario.toFixed(2)}</td>
                          <td className="p-2 text-sm text-right font-medium">R$ {item.total.toFixed(2)}</td>
                          <td className="p-2 text-center">
                            <Button variant="ghost" size="sm" onClick={() => removerItem(item.id)}>
                              <Trash2 className="h-3 w-3 text-red-500" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="bg-gray-50 border-t">
                      <tr>
                        <td colSpan={5} className="p-2 text-sm font-medium text-right">Total Geral:</td>
                        <td className="p-2 text-sm font-bold text-right">R$ {valorTotalOrdem.toFixed(2)}</td>
                        <td></td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Condições de Entrega */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="h-5 w-5" />
                Condições de Entrega
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Prazo (dias úteis)</Label>
                <Input type="number" placeholder="30" />
              </div>
              <div>
                <Label>Data Limite (calculada)</Label>
                <Input type="date" disabled />
              </div>
              <div>
                <Label>Local de Entrega</Label>
                <Input placeholder="Ex: Almoxarifado Central" />
              </div>
              <div>
                <Label>Endereço Completo</Label>
                <Input placeholder="Rua, número, bairro, cidade" />
              </div>
              <div>
                <Label>Horário de Funcionamento</Label>
                <Input placeholder="Ex: 8h às 17h" />
              </div>
              <div>
                <Label>Responsável pelo Recebimento</Label>
                <Input placeholder="Nome do responsável" />
              </div>
              <div>
                <Label>Telefone</Label>
                <Input placeholder="(11) 99999-9999" />
              </div>
              <div>
                <Label>Instruções Especiais</Label>
                <Textarea placeholder="Observações sobre a entrega..." />
              </div>
            </CardContent>
          </Card>

          {/* Condições de Pagamento */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Condições de Pagamento
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Forma de Pagamento</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a forma" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="transferencia">Transferência Bancária</SelectItem>
                    <SelectItem value="boleto">Boleto Bancário</SelectItem>
                    <SelectItem value="pix">PIX</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Prazo de Pagamento</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o prazo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30 dias após entrega</SelectItem>
                    <SelectItem value="45">45 dias após entrega</SelectItem>
                    <SelectItem value="60">60 dias após entrega</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-2">
                <Label>Condições Especiais</Label>
                <Textarea placeholder="Condições especiais de pagamento..." />
              </div>
            </CardContent>
          </Card>

          {/* Observações */}
          <Card>
            <CardHeader>
              <CardTitle>Observações Gerais</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea placeholder="Observações gerais sobre a ordem de fornecimento..." />
            </CardContent>
          </Card>

          {/* Ações */}
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setModalNovaOrdem(false)}>
              Cancelar
            </Button>
            <Button variant="outline">
              <Eye className="h-4 w-4 mr-2" />
              Visualizar PDF
            </Button>
            <Button>
              <Send className="h-4 w-4 mr-2" />
              Gerar e Enviar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )

  const renderCronograma = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Cronograma de Entregas</h2>
          <p className="text-gray-600">Controle de emendas e entregas parceladas</p>
        </div>
        <Button onClick={() => setModalCronograma(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Nova Emenda
        </Button>
      </div>

      <div className="grid gap-4">
        {/* Emenda 1 */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="flex items-center gap-2">
                  Emenda 001/2024
                  <Badge variant="secondary">Em Andamento</Badge>
                </CardTitle>
                <CardDescription>Licitação LP-001/2024 - Material de Escritório</CardDescription>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-green-600">75%</div>
                <div className="text-sm text-gray-500">Executado</div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div>
                <Label className="text-sm text-gray-500">Data Prevista</Label>
                <div className="font-medium">15/02/2024</div>
              </div>
              <div>
                <Label className="text-sm text-gray-500">Valor Parcial</Label>
                <div className="font-medium">R$ 25.000,00</div>
              </div>
              <div>
                <Label className="text-sm text-gray-500">Valor Entregue</Label>
                <div className="font-medium text-green-600">R$ 18.750,00</div>
              </div>
              <div>
                <Label className="text-sm text-gray-500">Valor Pendente</Label>
                <div className="font-medium text-orange-600">R$ 6.250,00</div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progresso da Entrega</span>
                <span>75% (3 de 4 produtos entregues)</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm text-gray-500">Produtos</Label>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>✅ Papel A4 - 500 resmas</span>
                    <span className="text-green-600">Entregue</span>
                  </div>
                  <div className="flex justify-between">
                    <span>✅ Canetas - 200 unidades</span>
                    <span className="text-green-600">Entregue</span>
                  </div>
                  <div className="flex justify-between">
                    <span>✅ Grampeadores - 50 unidades</span>
                    <span className="text-green-600">Entregue</span>
                  </div>
                  <div className="flex justify-between">
                    <span>⏳ Pastas - 100 unidades</span>
                    <span className="text-orange-600">Pendente</span>
                  </div>
                </div>
              </div>
              <div>
                <Label className="text-sm text-gray-500">Documentos</Label>
                <div className="space-y-1 text-sm">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    <span>NF-e 12345 - R$ 18.750,00</span>
                    <Button variant="ghost" size="sm">
                      <Download className="h-3 w-3" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    <span>Recibo de Entrega REC-001</span>
                    <Button variant="ghost" size="sm">
                      <Download className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Emenda 2 */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="flex items-center gap-2">
                  Emenda 002/2024
                  <Badge variant="outline">Pendente</Badge>
                </CardTitle>
                <CardDescription>Licitação LP-001/2024 - Material de Escritório</CardDescription>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-400">0%</div>
                <div className="text-sm text-gray-500">Executado</div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div>
                <Label className="text-sm text-gray-500">Data Prevista</Label>
                <div className="font-medium">01/03/2024</div>
              </div>
              <div>
                <Label className="text-sm text-gray-500">Valor Parcial</Label>
                <div className="font-medium">R$ 35.000,00</div>
              </div>
              <div>
                <Label className="text-sm text-gray-500">Status</Label>
                <div className="font-medium text-gray-600">Aguardando Separação</div>
              </div>
              <div>
                <Label className="text-sm text-gray-500">Prazo Restante</Label>
                <div className="font-medium text-blue-600">15 dias</div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progresso da Entrega</span>
                <span>0% (0 de 5 produtos separados)</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-gray-400 h-2 rounded-full" style={{ width: '0%' }}></div>
              </div>
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
          <h1 className="text-2xl font-bold">Ordem de Fornecimento</h1>
          <p className="text-gray-600">Geração e controle de ordens de fornecimento</p>
        </div>
      </div>

      <Tabs value={abaSelecionada} onValueChange={setAbaSelecionada}>
        <TabsList>
          <TabsTrigger value="lista">Lista de Ordens</TabsTrigger>
          <TabsTrigger value="cronograma">Cronograma de Entregas</TabsTrigger>
        </TabsList>

        <TabsContent value="lista">
          {renderListaOrdens()}
        </TabsContent>

        <TabsContent value="cronograma">
          {renderCronograma()}
        </TabsContent>
      </Tabs>

      {renderNovaOrdem()}
    </div>
  )
}