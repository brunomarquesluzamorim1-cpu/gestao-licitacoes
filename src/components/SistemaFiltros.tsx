'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { 
  ArrowLeft, 
  Search,
  Filter,
  Download,
  Mail,
  Printer,
  Eye,
  FileText,
  Receipt,
  Zap,
  Calendar,
  Building2,
  Package,
  DollarSign,
  X
} from 'lucide-react'

interface SistemaFiltrosProps {
  onVoltar: () => void
}

interface DocumentoResultado {
  id: string
  tipo: 'Ordem de Fornecimento' | 'Nota de Empenho' | 'Recibo de Entrega' | 'Nota Fiscal'
  numero: string
  data: Date
  orgao: string
  processo: string
  valor: number
  status: string
}

export default function SistemaFiltros({ onVoltar }: SistemaFiltrosProps) {
  const [filtros, setFiltros] = useState({
    tiposDocumento: [] as string[],
    periodoInicio: '',
    periodoFim: '',
    orgaoPublico: '',
    tipoProcesso: '',
    documentoBase: '',
    numeroDocumento: '',
    fornecedor: '',
    categoria: '',
    produto: '',
    valorMin: '',
    valorMax: '',
    status: '',
    numeroOF: '',
    numeroEmpenho: '',
    numeroContrato: '',
    numeroRecibo: '',
    numeroNFe: ''
  })

  const [resultados, setResultados] = useState<DocumentoResultado[]>([])
  const [carregando, setCarregando] = useState(false)
  const [documentosSelecionados, setDocumentosSelecionados] = useState<string[]>([])

  // Dados mockados para demonstração
  const documentosMockados: DocumentoResultado[] = [
    {
      id: '1',
      tipo: 'Ordem de Fornecimento',
      numero: 'OF-2024/000001',
      data: new Date('2024-01-15'),
      orgao: 'Prefeitura Municipal de São Paulo',
      processo: 'Pregão Eletrônico 001/2024',
      valor: 85000,
      status: 'Em Execução'
    },
    {
      id: '2',
      tipo: 'Nota de Empenho',
      numero: 'NE-2024/000001',
      data: new Date('2024-01-15'),
      orgao: 'Prefeitura Municipal de São Paulo',
      processo: 'Pregão Eletrônico 001/2024',
      valor: 85000,
      status: 'Emitido'
    },
    {
      id: '3',
      tipo: 'Recibo de Entrega',
      numero: 'REC-2024/000001',
      data: new Date('2024-01-20'),
      orgao: 'Prefeitura Municipal de São Paulo',
      processo: 'Pregão Eletrônico 001/2024',
      valor: 25000,
      status: 'Entregue'
    },
    {
      id: '4',
      tipo: 'Nota Fiscal',
      numero: 'NFe 000012345',
      data: new Date('2024-01-20'),
      orgao: 'Prefeitura Municipal de São Paulo',
      processo: 'Pregão Eletrônico 001/2024',
      valor: 25000,
      status: 'Autorizado'
    },
    {
      id: '5',
      tipo: 'Ordem de Fornecimento',
      numero: 'OF-2024/000002',
      data: new Date('2024-01-22'),
      orgao: 'Governo do Estado de SP',
      processo: 'Dispensa 002/2024',
      valor: 150000,
      status: 'Aceita'
    }
  ]

  const handleTipoDocumentoChange = (tipo: string, checked: boolean) => {
    if (checked) {
      setFiltros(prev => ({
        ...prev,
        tiposDocumento: [...prev.tiposDocumento, tipo]
      }))
    } else {
      setFiltros(prev => ({
        ...prev,
        tiposDocumento: prev.tiposDocumento.filter(t => t !== tipo)
      }))
    }
  }

  const handlePesquisar = () => {
    setCarregando(true)
    // Simular busca
    setTimeout(() => {
      let resultadosFiltrados = [...documentosMockados]

      // Aplicar filtros
      if (filtros.tiposDocumento.length > 0) {
        resultadosFiltrados = resultadosFiltrados.filter(doc => 
          filtros.tiposDocumento.includes(doc.tipo)
        )
      }

      if (filtros.orgaoPublico) {
        resultadosFiltrados = resultadosFiltrados.filter(doc => 
          doc.orgao.toLowerCase().includes(filtros.orgaoPublico.toLowerCase())
        )
      }

      if (filtros.valorMin) {
        resultadosFiltrados = resultadosFiltrados.filter(doc => 
          doc.valor >= Number(filtros.valorMin)
        )
      }

      if (filtros.valorMax) {
        resultadosFiltrados = resultadosFiltrados.filter(doc => 
          doc.valor <= Number(filtros.valorMax)
        )
      }

      setResultados(resultadosFiltrados)
      setCarregando(false)
    }, 1000)
  }

  const handleLimparFiltros = () => {
    setFiltros({
      tiposDocumento: [],
      periodoInicio: '',
      periodoFim: '',
      orgaoPublico: '',
      tipoProcesso: '',
      documentoBase: '',
      numeroDocumento: '',
      fornecedor: '',
      categoria: '',
      produto: '',
      valorMin: '',
      valorMax: '',
      status: '',
      numeroOF: '',
      numeroEmpenho: '',
      numeroContrato: '',
      numeroRecibo: '',
      numeroNFe: ''
    })
    setResultados([])
    setDocumentosSelecionados([])
  }

  const handleSelecionarDocumento = (id: string, selecionado: boolean) => {
    if (selecionado) {
      setDocumentosSelecionados(prev => [...prev, id])
    } else {
      setDocumentosSelecionados(prev => prev.filter(docId => docId !== id))
    }
  }

  const handleSelecionarTodos = (selecionado: boolean) => {
    if (selecionado) {
      setDocumentosSelecionados(resultados.map(doc => doc.id))
    } else {
      setDocumentosSelecionados([])
    }
  }

  const getIconeDocumento = (tipo: string) => {
    switch (tipo) {
      case 'Ordem de Fornecimento':
        return <FileText className="h-4 w-4 text-blue-500" />
      case 'Nota de Empenho':
        return <Receipt className="h-4 w-4 text-green-500" />
      case 'Recibo de Entrega':
        return <Package className="h-4 w-4 text-orange-500" />
      case 'Nota Fiscal':
        return <Zap className="h-4 w-4 text-purple-500" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      'Em Execução': 'secondary',
      'Emitido': 'default',
      'Entregue': 'default',
      'Autorizado': 'default',
      'Aceita': 'outline',
      'Pendente': 'destructive'
    } as const

    return (
      <Badge variant={variants[status as keyof typeof variants] || 'outline'}>
        {status}
      </Badge>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={onVoltar}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Sistema de Filtros e Consultas</h1>
          <p className="text-gray-600">Consulta avançada de documentos fiscais</p>
        </div>
      </div>

      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtros de Consulta
          </CardTitle>
          <CardDescription>
            Configure os filtros para encontrar os documentos desejados
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Tipo de Documento */}
          <div>
            <Label className="text-base font-medium">Tipo de Documento</Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2">
              {['Ordem de Fornecimento', 'Nota de Empenho', 'Recibo de Entrega', 'Nota Fiscal'].map((tipo) => (
                <div key={tipo} className="flex items-center space-x-2">
                  <Checkbox
                    id={tipo}
                    checked={filtros.tiposDocumento.includes(tipo)}
                    onCheckedChange={(checked) => handleTipoDocumentoChange(tipo, checked as boolean)}
                  />
                  <Label htmlFor={tipo} className="text-sm">{tipo}</Label>
                </div>
              ))}
            </div>
          </div>

          {/* Período */}
          <div>
            <Label className="text-base font-medium">Período</Label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
              <div>
                <Label className="text-sm">Data Inicial</Label>
                <Input
                  type="date"
                  value={filtros.periodoInicio}
                  onChange={(e) => setFiltros(prev => ({ ...prev, periodoInicio: e.target.value }))}
                />
              </div>
              <div>
                <Label className="text-sm">Data Final</Label>
                <Input
                  type="date"
                  value={filtros.periodoFim}
                  onChange={(e) => setFiltros(prev => ({ ...prev, periodoFim: e.target.value }))}
                />
              </div>
              <div>
                <Label className="text-sm">Atalhos</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um período" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hoje">Hoje</SelectItem>
                    <SelectItem value="semana">Esta Semana</SelectItem>
                    <SelectItem value="mes">Este Mês</SelectItem>
                    <SelectItem value="ano">Este Ano</SelectItem>
                    <SelectItem value="tudo">Tudo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Órgão e Processo */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Órgão Público</Label>
              <Select value={filtros.orgaoPublico} onValueChange={(value) => setFiltros(prev => ({ ...prev, orgaoPublico: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Todos os órgãos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Todos os órgãos</SelectItem>
                  <SelectItem value="prefeitura-sp">Prefeitura Municipal de São Paulo</SelectItem>
                  <SelectItem value="governo-sp">Governo do Estado de SP</SelectItem>
                  <SelectItem value="ministerio-saude">Ministério da Saúde</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Tipo de Processo</Label>
              <Select value={filtros.tipoProcesso} onValueChange={(value) => setFiltros(prev => ({ ...prev, tipoProcesso: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Todos os tipos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Todos os tipos</SelectItem>
                  <SelectItem value="licitacao">Licitação</SelectItem>
                  <SelectItem value="indenizatorio">Indenizatório</SelectItem>
                  <SelectItem value="dispensa">Dispensa</SelectItem>
                  <SelectItem value="inexigibilidade">Inexigibilidade</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Documento Base e Fornecedor */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Documento Base</Label>
              <div className="flex gap-2">
                <Select value={filtros.documentoBase} onValueChange={(value) => setFiltros(prev => ({ ...prev, documentoBase: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Contrato/ARP" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Todos</SelectItem>
                    <SelectItem value="contrato">Contrato</SelectItem>
                    <SelectItem value="arp">ARP</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  placeholder="Número"
                  value={filtros.numeroDocumento}
                  onChange={(e) => setFiltros(prev => ({ ...prev, numeroDocumento: e.target.value }))}
                />
              </div>
            </div>
            <div>
              <Label>Fornecedor</Label>
              <Select value={filtros.fornecedor} onValueChange={(value) => setFiltros(prev => ({ ...prev, fornecedor: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Todos os fornecedores" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Todos os fornecedores</SelectItem>
                  <SelectItem value="sua-empresa">Sua Empresa Ltda</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Categoria e Produto */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Categoria de Produto</Label>
              <Select value={filtros.categoria} onValueChange={(value) => setFiltros(prev => ({ ...prev, categoria: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Todas as categorias" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Todas as categorias</SelectItem>
                  <SelectItem value="material-escritorio">Material de Escritório</SelectItem>
                  <SelectItem value="informatica">Informática</SelectItem>
                  <SelectItem value="limpeza">Material de Limpeza</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Produto Específico</Label>
              <Input
                placeholder="Nome do produto ou código"
                value={filtros.produto}
                onChange={(e) => setFiltros(prev => ({ ...prev, produto: e.target.value }))}
              />
            </div>
          </div>

          {/* Valor e Status */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label>Valor Mínimo</Label>
              <Input
                type="number"
                placeholder="R$ 0,00"
                value={filtros.valorMin}
                onChange={(e) => setFiltros(prev => ({ ...prev, valorMin: e.target.value }))}
              />
            </div>
            <div>
              <Label>Valor Máximo</Label>
              <Input
                type="number"
                placeholder="R$ 999.999,99"
                value={filtros.valorMax}
                onChange={(e) => setFiltros(prev => ({ ...prev, valorMax: e.target.value }))}
              />
            </div>
            <div>
              <Label>Status</Label>
              <Select value={filtros.status} onValueChange={(value) => setFiltros(prev => ({ ...prev, status: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Todos os status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Todos os status</SelectItem>
                  <SelectItem value="emitido">Emitido</SelectItem>
                  <SelectItem value="andamento">Em Andamento</SelectItem>
                  <SelectItem value="entregue">Entregue</SelectItem>
                  <SelectItem value="pago">Pago</SelectItem>
                  <SelectItem value="cancelado">Cancelado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Números de Documento */}
          <div>
            <Label className="text-base font-medium">Números de Documento</Label>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-2">
              <div>
                <Label className="text-sm">Ordem de Fornecimento</Label>
                <Input
                  placeholder="OF-AAAA/NNNNNN"
                  value={filtros.numeroOF}
                  onChange={(e) => setFiltros(prev => ({ ...prev, numeroOF: e.target.value }))}
                />
              </div>
              <div>
                <Label className="text-sm">Nota de Empenho</Label>
                <Input
                  placeholder="NE-AAAA/NNNNNN"
                  value={filtros.numeroEmpenho}
                  onChange={(e) => setFiltros(prev => ({ ...prev, numeroEmpenho: e.target.value }))}
                />
              </div>
              <div>
                <Label className="text-sm">Contrato</Label>
                <Input
                  placeholder="Número do contrato"
                  value={filtros.numeroContrato}
                  onChange={(e) => setFiltros(prev => ({ ...prev, numeroContrato: e.target.value }))}
                />
              </div>
              <div>
                <Label className="text-sm">Recibo</Label>
                <Input
                  placeholder="REC-AAAA/NNNNNN"
                  value={filtros.numeroRecibo}
                  onChange={(e) => setFiltros(prev => ({ ...prev, numeroRecibo: e.target.value }))}
                />
              </div>
              <div>
                <Label className="text-sm">NF-e</Label>
                <Input
                  placeholder="Número da NFe"
                  value={filtros.numeroNFe}
                  onChange={(e) => setFiltros(prev => ({ ...prev, numeroNFe: e.target.value }))}
                />
              </div>
            </div>
          </div>

          {/* Botões de Ação */}
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={handleLimparFiltros}>
              <X className="h-4 w-4 mr-2" />
              Limpar Filtros
            </Button>
            <Button onClick={handlePesquisar} disabled={carregando}>
              <Search className="h-4 w-4 mr-2" />
              {carregando ? 'Pesquisando...' : 'Pesquisar'}
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Resultados */}
      {resultados.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Resultados da Consulta</CardTitle>
                <CardDescription>
                  {resultados.length} documento(s) encontrado(s)
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" disabled={documentosSelecionados.length === 0}>
                  <Download className="h-4 w-4 mr-2" />
                  Exportar Selecionados
                </Button>
                <Button variant="outline" size="sm" disabled={documentosSelecionados.length === 0}>
                  <Printer className="h-4 w-4 mr-2" />
                  Imprimir
                </Button>
                <Button variant="outline" size="sm" disabled={documentosSelecionados.length === 0}>
                  <Mail className="h-4 w-4 mr-2" />
                  Enviar Email
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3">
                      <Checkbox
                        checked={documentosSelecionados.length === resultados.length}
                        onCheckedChange={handleSelecionarTodos}
                      />
                    </th>
                    <th className="text-left p-3">Tipo</th>
                    <th className="text-left p-3">Número</th>
                    <th className="text-left p-3">Data</th>
                    <th className="text-left p-3">Órgão</th>
                    <th className="text-left p-3">Processo</th>
                    <th className="text-right p-3">Valor</th>
                    <th className="text-center p-3">Status</th>
                    <th className="text-center p-3">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {resultados.map((doc) => (
                    <tr key={doc.id} className="border-b hover:bg-gray-50">
                      <td className="p-3">
                        <Checkbox
                          checked={documentosSelecionados.includes(doc.id)}
                          onCheckedChange={(checked) => handleSelecionarDocumento(doc.id, checked as boolean)}
                        />
                      </td>
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          {getIconeDocumento(doc.tipo)}
                          <span className="text-sm">{doc.tipo}</span>
                        </div>
                      </td>
                      <td className="p-3 font-medium">{doc.numero}</td>
                      <td className="p-3">{doc.data.toLocaleDateString('pt-BR')}</td>
                      <td className="p-3 max-w-[200px] truncate">{doc.orgao}</td>
                      <td className="p-3">{doc.processo}</td>
                      <td className="p-3 text-right font-medium">
                        R$ {doc.valor.toLocaleString('pt-BR')}
                      </td>
                      <td className="p-3 text-center">
                        {getStatusBadge(doc.status)}
                      </td>
                      <td className="p-3 text-center">
                        <div className="flex justify-center gap-1">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Download className="h-3 w-3" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Paginação */}
            <div className="flex justify-between items-center mt-4">
              <div className="text-sm text-gray-500">
                Mostrando {resultados.length} de {resultados.length} resultados
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" disabled>
                  Anterior
                </Button>
                <Button variant="outline" size="sm" disabled>
                  1
                </Button>
                <Button variant="outline" size="sm" disabled>
                  Próximo
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Estado vazio */}
      {resultados.length === 0 && !carregando && (
        <Card>
          <CardContent className="text-center py-12">
            <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Nenhum documento encontrado
            </h3>
            <p className="text-gray-500 mb-4">
              Configure os filtros acima e clique em "Pesquisar" para encontrar documentos.
            </p>
            <Button onClick={handlePesquisar}>
              <Search className="h-4 w-4 mr-2" />
              Pesquisar Documentos
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}