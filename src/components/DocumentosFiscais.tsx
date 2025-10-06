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
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { 
  ArrowLeft, 
  Plus, 
  FileText, 
  Send, 
  Building2,
  Package,
  Truck,
  Eye,
  Download,
  CheckCircle,
  Clock,
  AlertTriangle,
  Receipt,
  FileCheck,
  Zap
} from 'lucide-react'

interface DocumentosFiscaisProps {
  onVoltar: () => void
}

interface DocumentoFiscal {
  id: string
  tipo: 'Nota de Empenho' | 'Recibo de Entrega' | 'Nota Fiscal Eletrônica'
  numero: string
  data: Date
  orgao: string
  valor: number
  status: 'Pendente' | 'Emitido' | 'Autorizado' | 'Rejeitado' | 'Cancelado'
}

export default function DocumentosFiscais({ onVoltar }: DocumentosFiscaisProps) {
  const [abaSelecionada, setAbaSelecionada] = useState('lista')
  const [modalNotaEmpenho, setModalNotaEmpenho] = useState(false)
  const [modalRecibo, setModalRecibo] = useState(false)
  const [modalNFe, setModalNFe] = useState(false)

  // Dados mockados
  const documentos: DocumentoFiscal[] = [
    {
      id: '1',
      tipo: 'Nota de Empenho',
      numero: 'NE-2024/000001',
      data: new Date('2024-01-15'),
      orgao: 'Prefeitura Municipal de São Paulo',
      valor: 85000,
      status: 'Emitido'
    },
    {
      id: '2',
      tipo: 'Recibo de Entrega',
      numero: 'REC-2024/000001',
      data: new Date('2024-01-20'),
      orgao: 'Prefeitura Municipal de São Paulo',
      valor: 25000,
      status: 'Emitido'
    },
    {
      id: '3',
      tipo: 'Nota Fiscal Eletrônica',
      numero: 'NFe 000012345',
      data: new Date('2024-01-20'),
      orgao: 'Prefeitura Municipal de São Paulo',
      valor: 25000,
      status: 'Autorizado'
    }
  ]

  const renderListaDocumentos = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Documentos Fiscais</h2>
          <p className="text-gray-600">Gerencie notas de empenho, recibos e notas fiscais</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setModalNotaEmpenho(true)}>
            <Receipt className="h-4 w-4 mr-2" />
            Nota de Empenho
          </Button>
          <Button variant="outline" onClick={() => setModalRecibo(true)}>
            <FileCheck className="h-4 w-4 mr-2" />
            Recibo de Entrega
          </Button>
          <Button onClick={() => setModalNFe(true)}>
            <Zap className="h-4 w-4 mr-2" />
            Nota Fiscal-e
          </Button>
        </div>
      </div>

      <div className="grid gap-4">
        {documentos.map((doc) => (
          <Card key={doc.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      {doc.tipo === 'Nota de Empenho' && <Receipt className="h-5 w-5 text-blue-500" />}
                      {doc.tipo === 'Recibo de Entrega' && <FileCheck className="h-5 w-5 text-green-500" />}
                      {doc.tipo === 'Nota Fiscal Eletrônica' && <Zap className="h-5 w-5 text-purple-500" />}
                      <h3 className="font-semibold text-lg">{doc.numero}</h3>
                    </div>
                    <Badge variant={
                      doc.status === 'Autorizado' ? 'default' :
                      doc.status === 'Emitido' ? 'secondary' :
                      doc.status === 'Pendente' ? 'outline' : 'destructive'
                    }>
                      {doc.status}
                    </Badge>
                  </div>
                  <p className="text-gray-600">{doc.tipo}</p>
                  <p className="text-gray-600">{doc.orgao}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>Data: {doc.data.toLocaleDateString('pt-BR')}</span>
                    <span>Valor: R$ {doc.valor.toLocaleString('pt-BR')}</span>
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

  const renderNotaEmpenho = () => (
    <Dialog open={modalNotaEmpenho} onOpenChange={setModalNotaEmpenho}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Receipt className="h-5 w-5" />
            Nova Nota de Empenho
          </DialogTitle>
          <DialogDescription>
            Gere uma nova nota de empenho para o órgão público
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Dados Básicos */}
          <Card>
            <CardHeader>
              <CardTitle>Dados Básicos</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label>Número</Label>
                <Input value="NE-2024/000002" disabled />
              </div>
              <div>
                <Label>Data de Emissão</Label>
                <Input type="date" defaultValue={new Date().toISOString().split('T')[0]} />
              </div>
              <div>
                <Label>Exercício</Label>
                <Input value="2024" disabled />
              </div>
            </CardContent>
          </Card>

          {/* Órgão Público */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Órgão Público
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Órgão</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o órgão" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="prefeitura-sp">Prefeitura Municipal de São Paulo</SelectItem>
                      <SelectItem value="governo-sp">Governo do Estado de SP</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Unidade Gestora</Label>
                  <Input placeholder="Ex: Secretaria de Educação" />
                </div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  <div><strong>CNPJ:</strong> 46.395.000/0001-39</div>
                  <div><strong>Inscrição Estadual:</strong> 110.042.490.114</div>
                  <div><strong>Endereço:</strong> Viaduto do Chá, 15 - Centro</div>
                  <div><strong>Telefone:</strong> (11) 3113-9000</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Processo */}
          <Card>
            <CardHeader>
              <CardTitle>Processo de Compra</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Tipo de Processo</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="licitacao">Licitação</SelectItem>
                    <SelectItem value="indenizatorio">Indenizatório</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Licitação</Label>
                <Input placeholder="Ex: Pregão Eletrônico 001/2024" />
              </div>
              <div>
                <Label>Contrato</Label>
                <Input placeholder="Ex: Contrato 001/2024" />
              </div>
              <div>
                <Label>Modalidade</Label>
                <Input placeholder="Ex: Pregão Eletrônico" />
              </div>
            </CardContent>
          </Card>

          {/* Credor */}
          <Card>
            <CardHeader>
              <CardTitle>Credor (Sua Empresa)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  <div><strong>Razão Social:</strong> Sua Empresa Ltda</div>
                  <div><strong>CNPJ:</strong> 12.345.678/0001-90</div>
                  <div><strong>Endereço:</strong> Rua das Empresas, 123</div>
                  <div><strong>Banco:</strong> Banco do Brasil - Ag: 1234-5 - CC: 12345-6</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Itens */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Itens a Empenhar
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left p-3 text-sm">Item</th>
                      <th className="text-left p-3 text-sm">Categoria</th>
                      <th className="text-left p-3 text-sm">Código</th>
                      <th className="text-right p-3 text-sm">Qtd</th>
                      <th className="text-right p-3 text-sm">Valor Unit.</th>
                      <th className="text-right p-3 text-sm">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t">
                      <td className="p-3 text-sm">Papel A4 75g</td>
                      <td className="p-3 text-sm">Material de Escritório</td>
                      <td className="p-3 text-sm">PAP001</td>
                      <td className="p-3 text-sm text-right">500</td>
                      <td className="p-3 text-sm text-right">R$ 25,00</td>
                      <td className="p-3 text-sm text-right font-medium">R$ 12.500,00</td>
                    </tr>
                    <tr className="border-t">
                      <td className="p-3 text-sm">Caneta Esferográfica Azul</td>
                      <td className="p-3 text-sm">Material de Escritório</td>
                      <td className="p-3 text-sm">CAN001</td>
                      <td className="p-3 text-sm text-right">200</td>
                      <td className="p-3 text-sm text-right">R$ 2,50</td>
                      <td className="p-3 text-sm text-right font-medium">R$ 500,00</td>
                    </tr>
                  </tbody>
                  <tfoot className="bg-gray-50 border-t">
                    <tr>
                      <td colSpan={5} className="p-3 text-sm font-medium text-right">Total Geral:</td>
                      <td className="p-3 text-sm font-bold text-right">R$ 13.000,00</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Dotação Orçamentária */}
          <Card>
            <CardHeader>
              <CardTitle>Dotação Orçamentária</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Código da Dotação</Label>
                <Input placeholder="Ex: 02.04.01.122.0001.2001.3.3.90.30.00" />
              </div>
              <div>
                <Label>Natureza da Despesa</Label>
                <Input placeholder="Ex: Material de Consumo" />
              </div>
              <div>
                <Label>Fonte de Recurso</Label>
                <Input placeholder="Ex: 100 - Recursos Ordinários" />
              </div>
              <div>
                <Label>Observações</Label>
                <Textarea placeholder="Observações sobre a dotação..." />
              </div>
            </CardContent>
          </Card>

          {/* Ações */}
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setModalNotaEmpenho(false)}>
              Cancelar
            </Button>
            <Button variant="outline">
              <Eye className="h-4 w-4 mr-2" />
              Visualizar PDF
            </Button>
            <Button>
              <Send className="h-4 w-4 mr-2" />
              Gerar e Salvar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )

  const renderReciboEntrega = () => (
    <Dialog open={modalRecibo} onOpenChange={setModalRecibo}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileCheck className="h-5 w-5" />
            Novo Recibo de Entrega
          </DialogTitle>
          <DialogDescription>
            Gere um recibo de entrega para comprovar a entrega dos produtos
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Dados Básicos */}
          <Card>
            <CardHeader>
              <CardTitle>Dados Básicos</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label>Número</Label>
                <Input value="REC-2024/000002" disabled />
              </div>
              <div>
                <Label>Data de Entrega</Label>
                <Input type="date" defaultValue={new Date().toISOString().split('T')[0]} />
              </div>
              <div>
                <Label>Hora de Entrega</Label>
                <Input type="time" defaultValue="14:30" />
              </div>
            </CardContent>
          </Card>

          {/* Destinatário */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Destinatário
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Órgão</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o órgão" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="prefeitura-sp">Prefeitura Municipal de São Paulo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Setor/Departamento</Label>
                  <Input placeholder="Ex: Almoxarifado Central" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Local de Entrega</Label>
                  <Input placeholder="Ex: Depósito 01" />
                </div>
                <div>
                  <Label>Endereço</Label>
                  <Input placeholder="Endereço completo" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Vinculação */}
          <Card>
            <CardHeader>
              <CardTitle>Vinculado a</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Tipo de Processo</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="licitacao">Licitação</SelectItem>
                    <SelectItem value="indenizatorio">Indenizatório</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Licitação</Label>
                <Input placeholder="Ex: Pregão Eletrônico 001/2024" />
              </div>
              <div>
                <Label>Emenda</Label>
                <Input placeholder="Ex: Emenda 001/2024" />
              </div>
              <div>
                <Label>Nota de Empenho</Label>
                <Input placeholder="Ex: NE-2024/000001" />
              </div>
              <div>
                <Label>Contrato</Label>
                <Input placeholder="Ex: Contrato 001/2024" />
              </div>
              <div>
                <Label>Ordem de Fornecimento</Label>
                <Input placeholder="Ex: OF-2024/000001" />
              </div>
            </CardContent>
          </Card>

          {/* Produtos Entregues */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Produtos Entregues
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left p-3 text-sm">Código</th>
                      <th className="text-left p-3 text-sm">Produto</th>
                      <th className="text-right p-3 text-sm">Qtd Contratada</th>
                      <th className="text-right p-3 text-sm">Qtd Entregue</th>
                      <th className="text-right p-3 text-sm">% Total</th>
                      <th className="text-right p-3 text-sm">Valor Unit.</th>
                      <th className="text-right p-3 text-sm">Total</th>
                      <th className="text-left p-3 text-sm">Lote/Validade</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t">
                      <td className="p-3 text-sm">PAP001</td>
                      <td className="p-3 text-sm">Papel A4 75g</td>
                      <td className="p-3 text-sm text-right">500</td>
                      <td className="p-3 text-sm text-right font-medium">300</td>
                      <td className="p-3 text-sm text-right">60%</td>
                      <td className="p-3 text-sm text-right">R$ 25,00</td>
                      <td className="p-3 text-sm text-right font-medium">R$ 7.500,00</td>
                      <td className="p-3 text-sm">L001/2025</td>
                    </tr>
                    <tr className="border-t">
                      <td className="p-3 text-sm">CAN001</td>
                      <td className="p-3 text-sm">Caneta Esferográfica</td>
                      <td className="p-3 text-sm text-right">200</td>
                      <td className="p-3 text-sm text-right font-medium">200</td>
                      <td className="p-3 text-sm text-right">100%</td>
                      <td className="p-3 text-sm text-right">R$ 2,50</td>
                      <td className="p-3 text-sm text-right font-medium">R$ 500,00</td>
                      <td className="p-3 text-sm">-</td>
                    </tr>
                  </tbody>
                  <tfoot className="bg-gray-50 border-t">
                    <tr>
                      <td colSpan={6} className="p-3 text-sm font-medium text-right">Valor desta Entrega:</td>
                      <td className="p-3 text-sm font-bold text-right">R$ 8.000,00</td>
                      <td></td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Responsável pelo Recebimento */}
          <Card>
            <CardHeader>
              <CardTitle>Responsável pelo Recebimento</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Nome</Label>
                <Input placeholder="Nome do responsável" />
              </div>
              <div>
                <Label>Cargo</Label>
                <Input placeholder="Ex: Almoxarife" />
              </div>
              <div>
                <Label>CPF</Label>
                <Input placeholder="000.000.000-00" />
              </div>
              <div>
                <Label>Matrícula</Label>
                <Input placeholder="Ex: 12345" />
              </div>
            </CardContent>
          </Card>

          {/* Transporte */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="h-5 w-5" />
                Transporte
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Transportadora</Label>
                <Input placeholder="Nome da transportadora" />
              </div>
              <div>
                <Label>NF de Transporte</Label>
                <Input placeholder="Número da NF de transporte" />
              </div>
              <div>
                <Label>Placa do Veículo</Label>
                <Input placeholder="ABC-1234" />
              </div>
              <div>
                <Label>Motorista</Label>
                <Input placeholder="Nome do motorista" />
              </div>
            </CardContent>
          </Card>

          {/* Observações */}
          <Card>
            <CardHeader>
              <CardTitle>Observações</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea placeholder="Observações sobre a entrega..." />
            </CardContent>
          </Card>

          {/* Ações */}
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setModalRecibo(false)}>
              Cancelar
            </Button>
            <Button variant="outline">
              <Eye className="h-4 w-4 mr-2" />
              Visualizar PDF
            </Button>
            <Button>
              <Send className="h-4 w-4 mr-2" />
              Gerar e Salvar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )

  const renderNotaFiscalEletronica = () => (
    <Dialog open={modalNFe} onOpenChange={setModalNFe}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Nova Nota Fiscal Eletrônica
          </DialogTitle>
          <DialogDescription>
            Gere uma NFe para transmitir à SEFAZ
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Dados Básicos */}
          <Card>
            <CardHeader>
              <CardTitle>Dados Básicos</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <Label>Número</Label>
                <Input value="000012346" disabled />
              </div>
              <div>
                <Label>Série</Label>
                <Input value="001" disabled />
              </div>
              <div>
                <Label>Data de Emissão</Label>
                <Input type="date" defaultValue={new Date().toISOString().split('T')[0]} />
              </div>
              <div>
                <Label>Hora</Label>
                <Input type="time" defaultValue="14:30" />
              </div>
              <div>
                <Label>Data de Saída</Label>
                <Input type="date" defaultValue={new Date().toISOString().split('T')[0]} />
              </div>
              <div>
                <Label>Natureza da Operação</Label>
                <Input value="Venda de Mercadoria" />
              </div>
              <div>
                <Label>Tipo de NF</Label>
                <Select defaultValue="saida">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="saida">Saída</SelectItem>
                    <SelectItem value="entrada">Entrada</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Destinatário */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Destinatário
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Órgão Público</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o órgão" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="prefeitura-sp">Prefeitura Municipal de São Paulo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Button variant="outline" size="sm">
                    Importar Itens do Recibo
                  </Button>
                </div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  <div><strong>Razão Social:</strong> Prefeitura Municipal de São Paulo</div>
                  <div><strong>CNPJ:</strong> 46.395.000/0001-39</div>
                  <div><strong>Inscrição Estadual:</strong> 110.042.490.114</div>
                  <div><strong>Endereço:</strong> Viaduto do Chá, 15 - Centro</div>
                  <div><strong>CEP:</strong> 01002-020</div>
                  <div><strong>Cidade/UF:</strong> São Paulo/SP</div>
                  <div><strong>Telefone:</strong> (11) 3113-9000</div>
                  <div><strong>Email:</strong> compras@prefeitura.sp.gov.br</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Produtos/Serviços */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Produtos/Serviços
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left p-2 text-xs">Produto</th>
                      <th className="text-left p-2 text-xs">NCM</th>
                      <th className="text-left p-2 text-xs">CFOP</th>
                      <th className="text-left p-2 text-xs">CST</th>
                      <th className="text-right p-2 text-xs">Qtd</th>
                      <th className="text-right p-2 text-xs">Unit.</th>
                      <th className="text-right p-2 text-xs">Total</th>
                      <th className="text-right p-2 text-xs">ICMS%</th>
                      <th className="text-right p-2 text-xs">PIS%</th>
                      <th className="text-right p-2 text-xs">COFINS%</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t">
                      <td className="p-2 text-xs">Papel A4 75g</td>
                      <td className="p-2 text-xs">4802.56.90</td>
                      <td className="p-2 text-xs">5102</td>
                      <td className="p-2 text-xs">000</td>
                      <td className="p-2 text-xs text-right">300</td>
                      <td className="p-2 text-xs text-right">R$ 25,00</td>
                      <td className="p-2 text-xs text-right">R$ 7.500,00</td>
                      <td className="p-2 text-xs text-right">18%</td>
                      <td className="p-2 text-xs text-right">1,65%</td>
                      <td className="p-2 text-xs text-right">7,6%</td>
                    </tr>
                    <tr className="border-t">
                      <td className="p-2 text-xs">Caneta Esferográfica</td>
                      <td className="p-2 text-xs">9608.10.00</td>
                      <td className="p-2 text-xs">5102</td>
                      <td className="p-2 text-xs">000</td>
                      <td className="p-2 text-xs text-right">200</td>
                      <td className="p-2 text-xs text-right">R$ 2,50</td>
                      <td className="p-2 text-xs text-right">R$ 500,00</td>
                      <td className="p-2 text-xs text-right">18%</td>
                      <td className="p-2 text-xs text-right">1,65%</td>
                      <td className="p-2 text-xs text-right">7,6%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Cálculo dos Impostos */}
          <Card>
            <CardHeader>
              <CardTitle>Cálculo dos Impostos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">ICMS</Label>
                  <div className="text-sm">
                    <div>Base: R$ 8.000,00</div>
                    <div>Alíquota: 18%</div>
                    <div className="font-medium">Valor: R$ 1.440,00</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">PIS</Label>
                  <div className="text-sm">
                    <div>Base: R$ 8.000,00</div>
                    <div>Alíquota: 1,65%</div>
                    <div className="font-medium">Valor: R$ 132,00</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">COFINS</Label>
                  <div className="text-sm">
                    <div>Base: R$ 8.000,00</div>
                    <div>Alíquota: 7,6%</div>
                    <div className="font-medium">Valor: R$ 608,00</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Totais</Label>
                  <div className="text-sm">
                    <div>Produtos: R$ 8.000,00</div>
                    <div>Impostos: R$ 2.180,00</div>
                    <div className="font-bold">Total NFe: R$ 8.000,00</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Informações Complementares */}
          <Card>
            <CardHeader>
              <CardTitle>Informações Complementares</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea 
                placeholder="Ex: Referente ao Pregão Eletrônico 001/2024, Emenda 001/2024, Empenho NE-2024/000001, Contrato 001/2024..."
                defaultValue="Referente ao Pregão Eletrônico 001/2024, Emenda 001/2024, Empenho NE-2024/000001, Contrato 001/2024. Entrega conforme Ordem de Fornecimento OF-2024/000001."
              />
            </CardContent>
          </Card>

          {/* Transporte */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="h-5 w-5" />
                Transporte
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Modalidade do Frete</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="emitente">Por conta do Emitente</SelectItem>
                    <SelectItem value="destinatario">Por conta do Destinatário</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Transportadora</Label>
                <Input placeholder="Nome da transportadora" />
              </div>
              <div>
                <Label>CNPJ</Label>
                <Input placeholder="00.000.000/0001-00" />
              </div>
              <div>
                <Label>Placa</Label>
                <Input placeholder="ABC-1234" />
              </div>
              <div>
                <Label>UF</Label>
                <Input placeholder="SP" />
              </div>
              <div>
                <Label>Volumes</Label>
                <Input type="number" placeholder="1" />
              </div>
              <div>
                <Label>Peso Bruto (kg)</Label>
                <Input type="number" step="0.01" placeholder="10.50" />
              </div>
            </CardContent>
          </Card>

          {/* Status SEFAZ */}
          <Card>
            <CardHeader>
              <CardTitle>Integração SEFAZ</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <Clock className="h-5 w-5 text-yellow-600" />
                <div>
                  <div className="font-medium">Status: Pendente</div>
                  <div className="text-sm text-gray-600">Aguardando transmissão para a SEFAZ</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Ações */}
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setModalNFe(false)}>
              Cancelar
            </Button>
            <Button variant="outline">
              Validar Dados
            </Button>
            <Button>
              <Zap className="h-4 w-4 mr-2" />
              Transmitir SEFAZ
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={onVoltar}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Documentos Fiscais</h1>
          <p className="text-gray-600">Geração de notas de empenho, recibos e notas fiscais</p>
        </div>
      </div>

      <Tabs value={abaSelecionada} onValueChange={setAbaSelecionada}>
        <TabsList>
          <TabsTrigger value="lista">Lista de Documentos</TabsTrigger>
        </TabsList>

        <TabsContent value="lista">
          {renderListaDocumentos()}
        </TabsContent>
      </Tabs>

      {renderNotaEmpenho()}
      {renderReciboEntrega()}
      {renderNotaFiscalEletronica()}
    </div>
  )
}