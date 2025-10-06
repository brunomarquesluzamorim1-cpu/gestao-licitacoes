'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { 
  Upload, 
  FileText, 
  Image, 
  Download, 
  Eye, 
  Search, 
  Filter, 
  Calendar,
  CreditCard,
  Banknote,
  Receipt,
  CheckCircle,
  Clock,
  AlertTriangle,
  Plus,
  Trash2,
  Edit,
  FolderOpen,
  Grid,
  List,
  Share,
  Tag,
  MapPin,
  Camera,
  Truck,
  Package,
  Building2,
  DollarSign,
  TrendingUp,
  BarChart3,
  PieChart,
  Users,
  Settings,
  Archive,
  Link,
  Paperclip,
  X,
  RotateCcw,
  ZoomIn,
  Move,
  Copy,
  Star,
  Shield,
  AlertCircle,
  Info
} from 'lucide-react'

// Tipos específicos para comprovantes
interface ComprovantePagamento {
  id: number
  entrada_id: number
  data_pagamento: string
  valor_pago: number
  metodo_pagamento: 'PIX' | 'Transferência' | 'Boleto' | 'Cartão Crédito' | 'Cartão Débito' | 'Dinheiro' | 'Cheque'
  conta_bancaria?: string
  numero_comprovante?: string
  observacoes?: string
  status: 'Pago' | 'Parcialmente Pago' | 'Pendente'
  arquivo_url?: string
  created_at: string
}

interface ComprovanteRecebimento {
  id: number
  saida_id: number
  data_recebimento: string
  valor_recebido: number
  tipo_recebimento: 'PIX' | 'TED/DOC' | 'Ordem Bancária' | 'Depósito' | 'Cheque'
  banco_origem?: string
  agencia_origem?: string
  numero_ob?: string
  numero_empenho?: string
  numero_liquidacao?: string
  data_liquidacao?: string
  observacoes?: string
  arquivo_url?: string
  // Vinculações
  nota_fiscal_id?: number
  nota_empenho_id?: number
  ordem_fornecimento_id?: number
  contrato_arp_id?: number
  recibo_entrega_id?: number
  created_at: string
}

interface ReciboEntregaCompleto {
  id: number
  numero: string
  data_entrega: string
  orgao_nome: string
  status: 'Em trânsito' | 'Entregue' | 'Conferido' | 'Aceito' | 'Recusado'
  valor_entrega: number
  responsavel_recebimento: string
  // Fotos durante entrega
  fotos_produtos_embalados: string[]
  fotos_descarga: string[]
  fotos_conferencia: string[]
  foto_assinatura: string[]
  foto_veiculo: string[]
  foto_nota_fiscal: string[]
  foto_canhoto: string[]
  // Documentos após entrega
  recibo_original_url?: string
  termo_conferencia_url?: string
  ata_recebimento_url?: string
  laudo_qualidade_url?: string
  atestado_conformidade_url?: string
  // Rastreamento
  geolocalizacao?: string
  data_hora_exata: string
  matricula_responsavel?: string
  codigo_rastreamento?: string
  created_at: string
}

interface PastaVirtual {
  id: number
  nome: string
  pasta_pai_id?: number
  tipo: 'pasta' | 'arquivo'
  caminho: string
  icone: string
  tamanho?: number
  data_modificacao: string
  permissoes: string[]
  tags: string[]
  versao?: number
  compartilhado: boolean
  link_temporario?: string
  validade_link?: string
}

export default function ComprovantesFinanceiros() {
  const [activeTab, setActiveTab] = useState('pagamentos')
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'timeline'>('list')
  const [selectedFiles, setSelectedFiles] = useState<number[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterPeriod, setFilterPeriod] = useState('')
  const [filterMethod, setFilterMethod] = useState('')
  const [showUploadDialog, setShowUploadDialog] = useState(false)
  const [showShareDialog, setShowShareDialog] = useState(false)

  // Dados de exemplo
  const comprovantesPagamento: ComprovantePagamento[] = [
    {
      id: 1,
      entrada_id: 1,
      data_pagamento: '2024-11-10',
      valor_pago: 15000.00,
      metodo_pagamento: 'PIX',
      conta_bancaria: 'Banco do Brasil - Ag: 1234 - CC: 56789-0',
      numero_comprovante: 'PIX123456789',
      status: 'Pago',
      arquivo_url: '/comprovantes/pix_001.pdf',
      observacoes: 'Pagamento à vista com desconto de 5%',
      created_at: '2024-11-10T14:30:00Z'
    },
    {
      id: 2,
      entrada_id: 2,
      data_pagamento: '2024-11-08',
      valor_pago: 8500.00,
      metodo_pagamento: 'Transferência',
      conta_bancaria: 'Caixa Econômica - Ag: 0987 - CC: 12345-6',
      numero_comprovante: 'TED987654321',
      status: 'Pago',
      arquivo_url: '/comprovantes/ted_002.pdf',
      created_at: '2024-11-08T10:15:00Z'
    },
    {
      id: 3,
      entrada_id: 3,
      data_pagamento: '2024-11-12',
      valor_pago: 3200.00,
      metodo_pagamento: 'Boleto',
      numero_comprovante: 'BOL456789123',
      status: 'Parcialmente Pago',
      observacoes: 'Pagamento parcelado - 1ª parcela',
      created_at: '2024-11-12T16:45:00Z'
    }
  ]

  const comprovantesRecebimento: ComprovanteRecebimento[] = [
    {
      id: 1,
      saida_id: 1,
      data_recebimento: '2024-11-09',
      valor_recebido: 45000.00,
      tipo_recebimento: 'Ordem Bancária',
      banco_origem: 'Banco do Brasil',
      agencia_origem: '3456-7',
      numero_ob: 'OB-2024/001234',
      numero_empenho: 'NE-2024/005678',
      numero_liquidacao: 'LIQ-2024/001122',
      data_liquidacao: '2024-11-08',
      arquivo_url: '/recebimentos/ob_001.pdf',
      nota_fiscal_id: 1,
      nota_empenho_id: 1,
      created_at: '2024-11-09T11:20:00Z'
    },
    {
      id: 2,
      saida_id: 2,
      data_recebimento: '2024-11-11',
      valor_recebido: 28000.00,
      tipo_recebimento: 'PIX',
      banco_origem: 'Caixa Econômica Federal',
      numero_empenho: 'NE-2024/005679',
      arquivo_url: '/recebimentos/pix_002.pdf',
      created_at: '2024-11-11T09:30:00Z'
    }
  ]

  const recibosEntregaCompletos: ReciboEntregaCompleto[] = [
    {
      id: 1,
      numero: 'REC-2024/000123',
      data_entrega: '2024-11-10',
      orgao_nome: 'Prefeitura Municipal de São Paulo',
      status: 'Aceito',
      valor_entrega: 45000.00,
      responsavel_recebimento: 'João Silva Santos',
      fotos_produtos_embalados: ['/fotos/entrega1_embalados.jpg'],
      fotos_descarga: ['/fotos/entrega1_descarga.jpg'],
      fotos_conferencia: ['/fotos/entrega1_conferencia.jpg'],
      foto_assinatura: ['/fotos/entrega1_assinatura.jpg'],
      foto_veiculo: ['/fotos/entrega1_veiculo.jpg'],
      foto_nota_fiscal: ['/fotos/entrega1_nf.jpg'],
      foto_canhoto: ['/fotos/entrega1_canhoto.jpg'],
      recibo_original_url: '/recibos/rec_001_original.pdf',
      termo_conferencia_url: '/recibos/rec_001_conferencia.pdf',
      ata_recebimento_url: '/recibos/rec_001_ata.pdf',
      geolocalizacao: '-23.5505, -46.6333',
      data_hora_exata: '2024-11-10T14:30:00Z',
      matricula_responsavel: '123456',
      created_at: '2024-11-10T14:30:00Z'
    }
  ]

  const estruturaPastas: PastaVirtual[] = [
    {
      id: 1,
      nome: 'Sistema ERP',
      tipo: 'pasta',
      caminho: '/',
      icone: 'folder',
      data_modificacao: '2024-11-12',
      permissoes: ['read', 'write', 'admin'],
      tags: [],
      compartilhado: false
    },
    {
      id: 2,
      nome: 'Financeiro',
      pasta_pai_id: 1,
      tipo: 'pasta',
      caminho: '/financeiro',
      icone: 'folder',
      data_modificacao: '2024-11-12',
      permissoes: ['read', 'write'],
      tags: ['financeiro'],
      compartilhado: false
    },
    {
      id: 3,
      nome: 'Comprovantes de Pagamento',
      pasta_pai_id: 2,
      tipo: 'pasta',
      caminho: '/financeiro/pagamentos',
      icone: 'folder',
      data_modificacao: '2024-11-12',
      permissoes: ['read', 'write'],
      tags: ['pagamentos'],
      compartilhado: false
    },
    {
      id: 4,
      nome: '2024',
      pasta_pai_id: 3,
      tipo: 'pasta',
      caminho: '/financeiro/pagamentos/2024',
      icone: 'folder',
      data_modificacao: '2024-11-12',
      permissoes: ['read', 'write'],
      tags: ['2024'],
      compartilhado: false
    }
  ]

  const dashboardFinanceiro = {
    totalPagamentos: 156800.00,
    totalRecebimentos: 284500.00,
    pagamentosPendentes: 23400.00,
    recebimentosPendentes: 67200.00,
    tempoMedioRecebimento: 18, // dias
    inadimplenciaPorOrgao: [
      { orgao: 'Prefeitura SP', valor: 45000, dias: 25 },
      { orgao: 'Secretaria Educação', valor: 22200, dias: 12 }
    ]
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pago':
      case 'Aceito':
      case 'Recebido':
        return 'bg-green-100 text-green-800'
      case 'Pendente':
      case 'Em trânsito':
        return 'bg-yellow-100 text-yellow-800'
      case 'Parcialmente Pago':
      case 'Conferido':
        return 'bg-blue-100 text-blue-800'
      case 'Atrasado':
      case 'Recusado':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getMethodIcon = (method: string) => {
    switch (method) {
      case 'PIX':
        return <Banknote className="w-4 h-4" />
      case 'Transferência':
      case 'TED/DOC':
        return <CreditCard className="w-4 h-4" />
      case 'Boleto':
        return <Receipt className="w-4 h-4" />
      case 'Cartão Crédito':
      case 'Cartão Débito':
        return <CreditCard className="w-4 h-4" />
      case 'Dinheiro':
        return <DollarSign className="w-4 h-4" />
      case 'Cheque':
        return <FileText className="w-4 h-4" />
      case 'Ordem Bancária':
        return <Building2 className="w-4 h-4" />
      default:
        return <FileText className="w-4 h-4" />
    }
  }

  const renderComprovantePagamento = (comprovante: ComprovantePagamento) => (
    <Card key={comprovante.id} className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            {getMethodIcon(comprovante.metodo_pagamento)}
            <div>
              <p className="font-semibold text-sm">{comprovante.metodo_pagamento}</p>
              <p className="text-xs text-gray-500">
                {new Date(comprovante.data_pagamento).toLocaleDateString('pt-BR')}
              </p>
            </div>
          </div>
          <Badge className={getStatusColor(comprovante.status)}>
            {comprovante.status}
          </Badge>
        </div>

        <div className="space-y-2 mb-3">
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Valor Pago:</span>
            <span className="font-semibold text-green-600">
              R$ {comprovante.valor_pago.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </span>
          </div>
          
          {comprovante.conta_bancaria && (
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Conta:</span>
              <span className="text-sm">{comprovante.conta_bancaria}</span>
            </div>
          )}
          
          {comprovante.numero_comprovante && (
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Comprovante:</span>
              <span className="text-sm font-mono">{comprovante.numero_comprovante}</span>
            </div>
          )}
        </div>

        {comprovante.observacoes && (
          <p className="text-xs text-gray-600 mb-3 p-2 bg-gray-50 rounded">
            {comprovante.observacoes}
          </p>
        )}

        <div className="flex gap-2">
          {comprovante.arquivo_url && (
            <Button variant="outline" size="sm">
              <Eye className="w-4 h-4 mr-1" />
              Visualizar
            </Button>
          )}
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-1" />
            Download
          </Button>
          <Button variant="outline" size="sm">
            <Edit className="w-4 h-4 mr-1" />
            Editar
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  const renderComprovanteRecebimento = (comprovante: ComprovanteRecebimento) => (
    <Card key={comprovante.id} className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            {getMethodIcon(comprovante.tipo_recebimento)}
            <div>
              <p className="font-semibold text-sm">{comprovante.tipo_recebimento}</p>
              <p className="text-xs text-gray-500">
                {new Date(comprovante.data_recebimento).toLocaleDateString('pt-BR')}
              </p>
            </div>
          </div>
          <Badge className="bg-green-100 text-green-800">
            Recebido
          </Badge>
        </div>

        <div className="space-y-2 mb-3">
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Valor Recebido:</span>
            <span className="font-semibold text-green-600">
              R$ {comprovante.valor_recebido.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </span>
          </div>
          
          {comprovante.banco_origem && (
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Banco Origem:</span>
              <span className="text-sm">{comprovante.banco_origem}</span>
            </div>
          )}
          
          {comprovante.numero_ob && (
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Ordem Bancária:</span>
              <span className="text-sm font-mono">{comprovante.numero_ob}</span>
            </div>
          )}

          {comprovante.numero_empenho && (
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Empenho:</span>
              <span className="text-sm font-mono">{comprovante.numero_empenho}</span>
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-1 mb-3">
          {comprovante.nota_fiscal_id && (
            <Badge variant="outline" className="text-xs">
              <Link className="w-3 h-3 mr-1" />
              NF-e
            </Badge>
          )}
          {comprovante.nota_empenho_id && (
            <Badge variant="outline" className="text-xs">
              <Link className="w-3 h-3 mr-1" />
              Empenho
            </Badge>
          )}
          {comprovante.ordem_fornecimento_id && (
            <Badge variant="outline" className="text-xs">
              <Link className="w-3 h-3 mr-1" />
              OF
            </Badge>
          )}
        </div>

        <div className="flex gap-2">
          {comprovante.arquivo_url && (
            <Button variant="outline" size="sm">
              <Eye className="w-4 h-4 mr-1" />
              Visualizar
            </Button>
          )}
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-1" />
            Download
            </Button>
          <Button variant="outline" size="sm">
            <Paperclip className="w-4 h-4 mr-1" />
            Vincular
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  const renderReciboEntregaCompleto = (recibo: ReciboEntregaCompleto) => (
    <Card key={recibo.id} className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div>
            <p className="font-semibold text-blue-600">{recibo.numero}</p>
            <p className="text-sm text-gray-600">{recibo.orgao_nome}</p>
            <p className="text-xs text-gray-500">
              {new Date(recibo.data_entrega).toLocaleDateString('pt-BR')}
            </p>
          </div>
          <Badge className={getStatusColor(recibo.status)}>
            {recibo.status}
          </Badge>
        </div>

        <div className="space-y-2 mb-3">
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Valor Entrega:</span>
            <span className="font-semibold text-green-600">
              R$ {recibo.valor_entrega.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Responsável:</span>
            <span className="text-sm">{recibo.responsavel_recebimento}</span>
          </div>

          {recibo.matricula_responsavel && (
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Matrícula:</span>
              <span className="text-sm font-mono">{recibo.matricula_responsavel}</span>
            </div>
          )}
        </div>

        {/* Fotos da Entrega */}
        <div className="mb-3">
          <p className="text-sm font-medium mb-2">Fotos da Entrega:</p>
          <div className="flex gap-2 flex-wrap">
            {recibo.fotos_produtos_embalados.length > 0 && (
              <Badge variant="outline" className="text-xs">
                <Camera className="w-3 h-3 mr-1" />
                Embalados ({recibo.fotos_produtos_embalados.length})
              </Badge>
            )}
            {recibo.fotos_descarga.length > 0 && (
              <Badge variant="outline" className="text-xs">
                <Truck className="w-3 h-3 mr-1" />
                Descarga ({recibo.fotos_descarga.length})
              </Badge>
            )}
            {recibo.fotos_conferencia.length > 0 && (
              <Badge variant="outline" className="text-xs">
                <Package className="w-3 h-3 mr-1" />
                Conferência ({recibo.fotos_conferencia.length})
              </Badge>
            )}
            {recibo.foto_assinatura.length > 0 && (
              <Badge variant="outline" className="text-xs">
                <Edit className="w-3 h-3 mr-1" />
                Assinatura
              </Badge>
            )}
          </div>
        </div>

        {/* Documentos */}
        <div className="mb-3">
          <p className="text-sm font-medium mb-2">Documentos:</p>
          <div className="flex gap-2 flex-wrap">
            {recibo.recibo_original_url && (
              <Badge variant="outline" className="text-xs">
                <FileText className="w-3 h-3 mr-1" />
                Recibo Original
              </Badge>
            )}
            {recibo.termo_conferencia_url && (
              <Badge variant="outline" className="text-xs">
                <CheckCircle className="w-3 h-3 mr-1" />
                Termo Conferência
              </Badge>
            )}
            {recibo.ata_recebimento_url && (
              <Badge variant="outline" className="text-xs">
                <FileText className="w-3 h-3 mr-1" />
                Ata Recebimento
              </Badge>
            )}
          </div>
        </div>

        {recibo.geolocalizacao && (
          <div className="flex items-center gap-2 mb-3 p-2 bg-blue-50 rounded">
            <MapPin className="w-4 h-4 text-blue-600" />
            <span className="text-sm text-blue-700">Localização registrada</span>
          </div>
        )}

        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Eye className="w-4 h-4 mr-1" />
            Ver Fotos
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-1" />
            Documentos
          </Button>
          <Button variant="outline" size="sm">
            <MapPin className="w-4 h-4 mr-1" />
            Localização
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  const renderGerenciadorDocumentos = () => (
    <div className="space-y-6">
      {/* Header do Gerenciador */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold">Gerenciador de Documentos</h3>
          <p className="text-sm text-gray-600">Organize e gerencie todos os documentos do sistema</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setViewMode('grid')}>
            <Grid className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={() => setViewMode('list')}>
            <List className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="sm">
            <Upload className="w-4 h-4 mr-2" />
            Upload
          </Button>
          <Button size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Nova Pasta
          </Button>
        </div>
      </div>

      {/* Dashboard de Documentos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Documentos</p>
                <p className="text-2xl font-bold">1,247</p>
              </div>
              <FileText className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Espaço Utilizado</p>
                <p className="text-2xl font-bold">2.4 GB</p>
              </div>
              <Archive className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Esta Semana</p>
                <p className="text-2xl font-bold">34</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pendentes</p>
                <p className="text-2xl font-bold">8</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros Rápidos */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm">
              <FileText className="w-4 h-4 mr-2" />
              PDFs
            </Button>
            <Button variant="outline" size="sm">
              <Image className="w-4 h-4 mr-2" />
              Imagens
            </Button>
            <Button variant="outline" size="sm">
              <Calendar className="w-4 h-4 mr-2" />
              Esta Semana
            </Button>
            <Button variant="outline" size="sm">
              <Building2 className="w-4 h-4 mr-2" />
              Por Órgão
            </Button>
            <Button variant="outline" size="sm">
              <AlertTriangle className="w-4 h-4 mr-2" />
              Vencendo
            </Button>
            <Button variant="outline" size="sm">
              <Star className="w-4 h-4 mr-2" />
              Favoritos
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Estrutura de Pastas */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Árvore de Pastas */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-sm">Estrutura de Pastas</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer">
                <FolderOpen className="w-4 h-4 text-blue-600" />
                <span className="text-sm">Sistema ERP</span>
              </div>
              <div className="ml-4 space-y-1">
                <div className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer">
                  <FolderOpen className="w-4 h-4 text-blue-600" />
                  <span className="text-sm">Financeiro</span>
                </div>
                <div className="ml-4 space-y-1">
                  <div className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer">
                    <FolderOpen className="w-4 h-4 text-blue-600" />
                    <span className="text-sm">Pagamentos</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer">
                    <FolderOpen className="w-4 h-4 text-blue-600" />
                    <span className="text-sm">Recebimentos</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer">
                  <FolderOpen className="w-4 h-4 text-blue-600" />
                  <span className="text-sm">Fiscal</span>
                </div>
                <div className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer">
                  <FolderOpen className="w-4 h-4 text-blue-600" />
                  <span className="text-sm">Licitações</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Lista de Arquivos */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm">Documentos</CardTitle>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="Buscar documentos..."
                    className="pl-10 w-64"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-2">
              {/* Exemplo de arquivos */}
              <div className="flex items-center justify-between p-3 border rounded hover:bg-gray-50">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-red-600" />
                  <div>
                    <p className="text-sm font-medium">Comprovante_PIX_001.pdf</p>
                    <p className="text-xs text-gray-500">Modificado em 10/11/2024 • 245 KB</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">PIX</Badge>
                  <Button variant="ghost" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Download className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Share className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 border rounded hover:bg-gray-50">
                <div className="flex items-center gap-3">
                  <Image className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-sm font-medium">Entrega_Fotos_REC001.zip</p>
                    <p className="text-xs text-gray-500">Modificado em 10/11/2024 • 2.1 MB</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">Entrega</Badge>
                  <Button variant="ghost" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Download className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Share className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 border rounded hover:bg-gray-50">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-sm font-medium">Ordem_Bancaria_OB001234.pdf</p>
                    <p className="text-xs text-gray-500">Modificado em 09/11/2024 • 156 KB</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">Recebimento</Badge>
                  <Button variant="ghost" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Download className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Share className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Ações em Massa */}
      {selectedFiles.length > 0 && (
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-blue-700">
                {selectedFiles.length} arquivo(s) selecionado(s)
              </p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Download ZIP
                </Button>
                <Button variant="outline" size="sm">
                  <Move className="w-4 h-4 mr-2" />
                  Mover
                </Button>
                <Button variant="outline" size="sm">
                  <Copy className="w-4 h-4 mr-2" />
                  Copiar
                </Button>
                <Button variant="outline" size="sm">
                  <Tag className="w-4 h-4 mr-2" />
                  Tags
                </Button>
                <Button variant="outline" size="sm">
                  <Share className="w-4 h-4 mr-2" />
                  Compartilhar
                </Button>
                <Button variant="destructive" size="sm">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Excluir
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )

  const renderDashboardFinanceiro = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* KPIs Financeiros */}
      <div className="lg:col-span-2 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Pagamentos</p>
                  <p className="text-2xl font-bold text-red-600">
                    R$ {dashboardFinanceiro.totalPagamentos.toLocaleString('pt-BR')}
                  </p>
                </div>
                <TrendingUp className="w-8 h-8 text-red-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Recebimentos</p>
                  <p className="text-2xl font-bold text-green-600">
                    R$ {dashboardFinanceiro.totalRecebimentos.toLocaleString('pt-BR')}
                  </p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Pagamentos Pendentes</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    R$ {dashboardFinanceiro.pagamentosPendentes.toLocaleString('pt-BR')}
                  </p>
                </div>
                <Clock className="w-8 h-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Recebimentos Pendentes</p>
                  <p className="text-2xl font-bold text-orange-600">
                    R$ {dashboardFinanceiro.recebimentosPendentes.toLocaleString('pt-BR')}
                  </p>
                </div>
                <AlertTriangle className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Gráfico de Fluxo de Caixa */}
        <Card>
          <CardHeader>
            <CardTitle>Fluxo de Caixa - Últimos 6 Meses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center">
                <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Gráfico de Fluxo de Caixa</p>
                <p className="text-sm text-gray-400">Pagamentos vs Recebimentos</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sidebar com Alertas e Métricas */}
      <div className="space-y-6">
        {/* Tempo Médio de Recebimento */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Tempo Médio de Recebimento</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-600">
                {dashboardFinanceiro.tempoMedioRecebimento}
              </p>
              <p className="text-sm text-gray-600">dias</p>
            </div>
          </CardContent>
        </Card>

        {/* Inadimplência por Órgão */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Inadimplência por Órgão</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-3">
              {dashboardFinanceiro.inadimplenciaPorOrgao.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-red-50 rounded">
                  <div>
                    <p className="text-sm font-medium">{item.orgao}</p>
                    <p className="text-xs text-gray-600">{item.dias} dias em atraso</p>
                  </div>
                  <p className="text-sm font-semibold text-red-600">
                    R$ {item.valor.toLocaleString('pt-BR')}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Ações Rápidas */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Ações Rápidas</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Plus className="w-4 h-4 mr-2" />
                Novo Comprovante
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Upload className="w-4 h-4 mr-2" />
                Upload em Massa
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Download className="w-4 h-4 mr-2" />
                Relatório Financeiro
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <BarChart3 className="w-4 h-4 mr-2" />
                Dashboard Detalhado
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Comprovantes Financeiros</h2>
          <p className="text-gray-600">Gestão completa de comprovantes de pagamento e recebimento</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Upload className="w-4 h-4 mr-2" />
            Upload
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Novo Comprovante
          </Button>
        </div>
      </div>

      {/* Tabs Principais */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="pagamentos">Pagamentos</TabsTrigger>
          <TabsTrigger value="recebimentos">Recebimentos</TabsTrigger>
          <TabsTrigger value="entregas">Entregas</TabsTrigger>
          <TabsTrigger value="documentos">Documentos</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-6">
          {renderDashboardFinanceiro()}
        </TabsContent>

        <TabsContent value="pagamentos" className="space-y-6">
          {/* Filtros */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-wrap gap-4">
                <div className="flex-1 min-w-64">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                      placeholder="Buscar comprovantes..."
                      className="pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                <Select value={filterPeriod} onValueChange={setFilterPeriod}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Período" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hoje">Hoje</SelectItem>
                    <SelectItem value="semana">Esta Semana</SelectItem>
                    <SelectItem value="mes">Este Mês</SelectItem>
                    <SelectItem value="ano">Este Ano</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterMethod} onValueChange={setFilterMethod}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Método de Pagamento" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pix">PIX</SelectItem>
                    <SelectItem value="transferencia">Transferência</SelectItem>
                    <SelectItem value="boleto">Boleto</SelectItem>
                    <SelectItem value="cartao">Cartão</SelectItem>
                    <SelectItem value="dinheiro">Dinheiro</SelectItem>
                    <SelectItem value="cheque">Cheque</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Mais Filtros
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Lista de Comprovantes de Pagamento */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {comprovantesPagamento.map(renderComprovantePagamento)}
          </div>
        </TabsContent>

        <TabsContent value="recebimentos" className="space-y-6">
          {/* Filtros similares aos pagamentos */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-wrap gap-4">
                <div className="flex-1 min-w-64">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                      placeholder="Buscar recebimentos..."
                      className="pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                <Select>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Órgão" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="prefeitura-sp">Prefeitura SP</SelectItem>
                    <SelectItem value="secretaria-educacao">Secretaria Educação</SelectItem>
                    <SelectItem value="hospital-municipal">Hospital Municipal</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Tipo de Recebimento" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pix">PIX</SelectItem>
                    <SelectItem value="ted-doc">TED/DOC</SelectItem>
                    <SelectItem value="ordem-bancaria">Ordem Bancária</SelectItem>
                    <SelectItem value="deposito">Depósito</SelectItem>
                    <SelectItem value="cheque">Cheque</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Lista de Comprovantes de Recebimento */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {comprovantesRecebimento.map(renderComprovanteRecebimento)}
          </div>
        </TabsContent>

        <TabsContent value="entregas" className="space-y-6">
          {/* Filtros para entregas */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-wrap gap-4">
                <div className="flex-1 min-w-64">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                      placeholder="Buscar entregas..."
                      className="pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                <Select>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="em-transito">Em Trânsito</SelectItem>
                    <SelectItem value="entregue">Entregue</SelectItem>
                    <SelectItem value="conferido">Conferido</SelectItem>
                    <SelectItem value="aceito">Aceito</SelectItem>
                    <SelectItem value="recusado">Recusado</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Camera className="w-4 h-4 mr-2" />
                  Nova Entrega
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Lista de Recibos de Entrega Completos */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {recibosEntregaCompletos.map(renderReciboEntregaCompleto)}
          </div>
        </TabsContent>

        <TabsContent value="documentos" className="space-y-6">
          {renderGerenciadorDocumentos()}
        </TabsContent>
      </Tabs>

      {/* Dialogs */}
      <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Upload de Comprovantes</DialogTitle>
            <DialogDescription>
              Faça upload de múltiplos comprovantes de uma vez
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-lg font-medium mb-2">Arraste arquivos aqui ou clique para selecionar</p>
              <p className="text-sm text-gray-500">Suporte para PDF, JPG, PNG até 10MB cada</p>
              <Button className="mt-4">
                Selecionar Arquivos
              </Button>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="categoria">Categoria</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pagamento">Comprovante de Pagamento</SelectItem>
                    <SelectItem value="recebimento">Comprovante de Recebimento</SelectItem>
                    <SelectItem value="entrega">Recibo de Entrega</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="vinculacao">Vincular a</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Documento para vincular" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="nf-001">NF-e 001/2024</SelectItem>
                    <SelectItem value="ne-002">Nota Empenho 002/2024</SelectItem>
                    <SelectItem value="of-003">Ordem Fornecimento 003/2024</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div>
              <Label htmlFor="observacoes">Observações</Label>
              <Textarea 
                id="observacoes"
                placeholder="Observações sobre os documentos..."
                rows={3}
              />
            </div>
            
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowUploadDialog(false)}>
                Cancelar
              </Button>
              <Button>
                Fazer Upload
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Compartilhar Documentos</DialogTitle>
            <DialogDescription>
              Gere um link temporário para compartilhar os documentos selecionados
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="senha">Senha de Acesso</Label>
              <Input 
                id="senha"
                type="password"
                placeholder="Digite uma senha para proteger o link"
              />
            </div>
            
            <div>
              <Label htmlFor="validade">Validade do Link</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a validade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1h">1 hora</SelectItem>
                  <SelectItem value="24h">24 horas</SelectItem>
                  <SelectItem value="7d">7 dias</SelectItem>
                  <SelectItem value="30d">30 dias</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm font-medium mb-2">Link Gerado:</p>
              <div className="flex items-center gap-2">
                <Input 
                  value="https://sistema.empresa.com/share/abc123def456"
                  readOnly
                  className="font-mono text-sm"
                />
                <Button variant="outline" size="sm">
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowShareDialog(false)}>
                Fechar
              </Button>
              <Button>
                Enviar por Email
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}