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
  Star,
  Phone,
  Mail,
  MapPin,
  Building2,
  User,
  Calendar,
  FileText,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Edit,
  Trash2,
  Upload
} from 'lucide-react'
import { Fornecedor, ContatoFornecedor } from '@/lib/types'

interface CadastroFornecedoresProps {
  onVoltar: () => void
}

export default function CadastroFornecedores({ onVoltar }: CadastroFornecedoresProps) {
  const [visualizacao, setVisualizacao] = useState<'lista' | 'cadastro' | 'detalhes'>('lista')
  const [fornecedorSelecionado, setFornecedorSelecionado] = useState<string | null>(null)
  const [filtroStatus, setFiltroStatus] = useState<string>('todos')
  const [termoBusca, setTermoBusca] = useState('')

  // Dados mockados para demonstração
  const fornecedores: Fornecedor[] = [
    {
      id: '1',
      razaoSocial: 'ABC Distribuidora Ltda',
      nomeFantasia: 'ABC Distribuidora',
      cnpjCpf: '12.345.678/0001-90',
      inscricaoEstadual: '123.456.789.012',
      telefones: ['(11) 3456-7890', '(11) 98765-4321'],
      emails: ['comercial@abc.com.br', 'vendas@abc.com.br'],
      website: 'www.abcdistribuidora.com.br',
      endereco: 'Rua das Flores, 123 - Centro - São Paulo/SP',
      classificacao: {
        categoria: 'Material de Escritório',
        rating: 4.5,
        status: 'Ativo',
        observacoes: 'Fornecedor confiável com boa qualidade'
      },
      contatos: [
        {
          id: '1',
          nome: 'João Silva',
          cargo: 'Vendedor',
          telefone: '(11) 98765-4321',
          email: 'joao@abc.com.br',
          whatsapp: '(11) 98765-4321',
          aniversario: new Date('1985-03-15'),
          observacoes: 'Responsável pela região Sul',
          tipo: 'Vendedor'
        }
      ],
      condicoesComerciais: {
        prazoPagamento: 30,
        formaPagamento: ['Boleto', 'PIX', 'Transferência'],
        desconto: 5,
        frete: 'CIF',
        prazoEntrega: 7,
        pedidoMinimo: 1000
      },
      produtosFornecidos: [
        {
          produtoId: '1',
          preco: 15.50,
          ultimaAtualizacao: new Date('2024-01-15')
        }
      ],
      documentacao: ['CND Federal', 'CND Estadual', 'Contrato'],
      historico: {
        comprasRealizadas: [
          {
            id: '1',
            data: new Date('2024-01-10'),
            valor: 5000,
            produtos: ['Papel A4', 'Canetas'],
            status: 'Entregue'
          }
        ],
        valorTotalNegociado: 25000,
        pedidosAberto: 2,
        problemas: [],
        prazosCumpridos: 95
      },
      avaliacao: {
        qualidadeProdutos: 4.5,
        pontualidadeEntregas: 4.2,
        precoCompetitivo: 4.0,
        atendimento: 4.8,
        notaGeral: 4.4
      }
    },
    {
      id: '2',
      razaoSocial: 'XYZ Suprimentos S.A.',
      nomeFantasia: 'XYZ Suprimentos',
      cnpjCpf: '98.765.432/0001-10',
      telefones: ['(11) 2345-6789'],
      emails: ['contato@xyz.com.br'],
      endereco: 'Av. Paulista, 1000 - Bela Vista - São Paulo/SP',
      classificacao: {
        categoria: 'Equipamentos de Informática',
        rating: 3.8,
        status: 'Ativo',
        observacoes: 'Preços competitivos'
      },
      contatos: [],
      condicoesComerciais: {
        prazoPagamento: 45,
        formaPagamento: ['Boleto'],
        desconto: 3,
        frete: 'FOB',
        prazoEntrega: 10,
        pedidoMinimo: 2000
      },
      produtosFornecidos: [],
      documentacao: [],
      historico: {
        comprasRealizadas: [],
        valorTotalNegociado: 15000,
        pedidosAberto: 0,
        problemas: ['Atraso na entrega - Jan/2024'],
        prazosCumpridos: 85
      },
      avaliacao: {
        qualidadeProdutos: 4.0,
        pontualidadeEntregas: 3.5,
        precoCompetitivo: 4.2,
        atendimento: 3.8,
        notaGeral: 3.9
      }
    }
  ]

  const fornecedoresFiltrados = fornecedores.filter(fornecedor => {
    const matchStatus = filtroStatus === 'todos' || fornecedor.classificacao.status.toLowerCase() === filtroStatus
    const matchBusca = fornecedor.razaoSocial.toLowerCase().includes(termoBusca.toLowerCase()) ||
                      fornecedor.nomeFantasia.toLowerCase().includes(termoBusca.toLowerCase())
    return matchStatus && matchBusca
  })

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
      />
    ))
  }

  const renderLista = () => (
    <div className="space-y-6">
      {/* Header com filtros */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex gap-2">
          <div className="relative flex-1 sm:w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar fornecedores..."
              value={termoBusca}
              onChange={(e) => setTermoBusca(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={filtroStatus} onValueChange={setFiltroStatus}>
            <SelectTrigger className="w-40">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="ativo">Ativo</SelectItem>
              <SelectItem value="inativo">Inativo</SelectItem>
              <SelectItem value="bloqueado">Bloqueado</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button onClick={() => setVisualizacao('cadastro')}>
          <Plus className="h-4 w-4 mr-2" />
          Novo Fornecedor
        </Button>
      </div>

      {/* Lista de fornecedores */}
      <div className="grid gap-4">
        {fornecedoresFiltrados.map((fornecedor) => (
          <Card key={fornecedor.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold text-lg">{fornecedor.nomeFantasia}</h3>
                    <Badge 
                      variant={
                        fornecedor.classificacao.status === 'Ativo' ? 'default' :
                        fornecedor.classificacao.status === 'Inativo' ? 'secondary' : 'destructive'
                      }
                    >
                      {fornecedor.classificacao.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{fornecedor.razaoSocial}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Building2 className="h-4 w-4" />
                      {fornecedor.cnpjCpf}
                    </span>
                    <span className="flex items-center gap-1">
                      <Phone className="h-4 w-4" />
                      {fornecedor.telefones[0]}
                    </span>
                    <span className="flex items-center gap-1">
                      <Mail className="h-4 w-4" />
                      {fornecedor.emails[0]}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">Avaliação:</span>
                    <div className="flex items-center gap-1">
                      {renderStars(fornecedor.avaliacao.notaGeral)}
                      <span className="text-sm text-muted-foreground ml-1">
                        ({fornecedor.avaliacao.notaGeral.toFixed(1)})
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      setFornecedorSelecionado(fornecedor.id)
                      setVisualizacao('detalhes')
                    }}
                  >
                    Ver Detalhes
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )

  const renderCadastro = () => (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={() => setVisualizacao('lista')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar
        </Button>
        <h2 className="text-2xl font-bold">Novo Fornecedor</h2>
      </div>

      <Tabs defaultValue="dados-cadastrais" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="dados-cadastrais">Dados Cadastrais</TabsTrigger>
          <TabsTrigger value="contatos">Contatos</TabsTrigger>
          <TabsTrigger value="comercial">Comercial</TabsTrigger>
          <TabsTrigger value="produtos">Produtos</TabsTrigger>
          <TabsTrigger value="documentacao">Documentação</TabsTrigger>
        </TabsList>

        <TabsContent value="dados-cadastrais">
          <Card>
            <CardHeader>
              <CardTitle>Informações Básicas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="razao-social">Razão Social *</Label>
                  <Input id="razao-social" placeholder="Razão social completa" />
                </div>
                <div>
                  <Label htmlFor="nome-fantasia">Nome Fantasia</Label>
                  <Input id="nome-fantasia" placeholder="Nome fantasia" />
                </div>
                <div>
                  <Label htmlFor="cnpj">CNPJ/CPF *</Label>
                  <Input id="cnpj" placeholder="00.000.000/0000-00" />
                </div>
                <div>
                  <Label htmlFor="inscricao-estadual">Inscrição Estadual</Label>
                  <Input id="inscricao-estadual" placeholder="000.000.000.000" />
                </div>
                <div>
                  <Label htmlFor="telefone-principal">Telefone Principal *</Label>
                  <Input id="telefone-principal" placeholder="(00) 0000-0000" />
                </div>
                <div>
                  <Label htmlFor="telefone-secundario">Telefone Secundário</Label>
                  <Input id="telefone-secundario" placeholder="(00) 0000-0000" />
                </div>
                <div>
                  <Label htmlFor="email-comercial">Email Comercial *</Label>
                  <Input id="email-comercial" type="email" placeholder="comercial@empresa.com" />
                </div>
                <div>
                  <Label htmlFor="email-financeiro">Email Financeiro</Label>
                  <Input id="email-financeiro" type="email" placeholder="financeiro@empresa.com" />
                </div>
                <div>
                  <Label htmlFor="website">Website</Label>
                  <Input id="website" placeholder="www.empresa.com.br" />
                </div>
                <div>
                  <Label htmlFor="categoria">Categoria de Fornecimento *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="material-escritorio">Material de Escritório</SelectItem>
                      <SelectItem value="equipamentos-informatica">Equipamentos de Informática</SelectItem>
                      <SelectItem value="material-limpeza">Material de Limpeza</SelectItem>
                      <SelectItem value="generos-alimenticios">Gêneros Alimentícios</SelectItem>
                      <SelectItem value="material-construcao">Material de Construção</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator />

              <div>
                <Label htmlFor="endereco-completo">Endereço Completo *</Label>
                <Textarea 
                  id="endereco-completo" 
                  placeholder="Rua, número, complemento, bairro, cidade, estado, CEP"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="status">Status *</Label>
                  <Select defaultValue="ativo">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ativo">Ativo</SelectItem>
                      <SelectItem value="inativo">Inativo</SelectItem>
                      <SelectItem value="bloqueado">Bloqueado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="rating">Avaliação Inicial</Label>
                  <Select defaultValue="5">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">⭐⭐⭐⭐⭐ (5 estrelas)</SelectItem>
                      <SelectItem value="4">⭐⭐⭐⭐ (4 estrelas)</SelectItem>
                      <SelectItem value="3">⭐⭐⭐ (3 estrelas)</SelectItem>
                      <SelectItem value="2">⭐⭐ (2 estrelas)</SelectItem>
                      <SelectItem value="1">⭐ (1 estrela)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="observacoes">Observações Gerais</Label>
                <Textarea 
                  id="observacoes" 
                  placeholder="Informações adicionais sobre o fornecedor..."
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contatos">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Contatos na Empresa
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Contato
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="nome-contato">Nome Completo *</Label>
                  <Input id="nome-contato" placeholder="Nome do contato" />
                </div>
                <div>
                  <Label htmlFor="cargo-contato">Cargo/Setor *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o cargo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vendedor">Vendedor</SelectItem>
                      <SelectItem value="gerente">Gerente Comercial</SelectItem>
                      <SelectItem value="financeiro">Financeiro</SelectItem>
                      <SelectItem value="logistica">Logística</SelectItem>
                      <SelectItem value="sac">SAC</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="telefone-contato">Telefone Direto *</Label>
                  <Input id="telefone-contato" placeholder="(00) 0000-0000" />
                </div>
                <div>
                  <Label htmlFor="email-contato">Email *</Label>
                  <Input id="email-contato" type="email" placeholder="contato@empresa.com" />
                </div>
                <div>
                  <Label htmlFor="whatsapp-contato">WhatsApp</Label>
                  <Input id="whatsapp-contato" placeholder="(00) 00000-0000" />
                </div>
                <div>
                  <Label htmlFor="aniversario-contato">Aniversário</Label>
                  <Input id="aniversario-contato" type="date" />
                </div>
              </div>
              <div>
                <Label htmlFor="observacoes-contato">Observações do Contato</Label>
                <Textarea 
                  id="observacoes-contato" 
                  placeholder="Informações específicas sobre este contato..."
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="comercial">
          <Card>
            <CardHeader>
              <CardTitle>Condições Comerciais</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="prazo-pagamento">Prazo de Pagamento (dias) *</Label>
                  <Input id="prazo-pagamento" type="number" placeholder="30" />
                </div>
                <div>
                  <Label htmlFor="desconto">Desconto Padrão (%)</Label>
                  <Input id="desconto" type="number" step="0.1" placeholder="5.0" />
                </div>
                <div>
                  <Label htmlFor="frete">Tipo de Frete *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cif">CIF (por conta do fornecedor)</SelectItem>
                      <SelectItem value="fob">FOB (por nossa conta)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="prazo-entrega">Prazo de Entrega (dias) *</Label>
                  <Input id="prazo-entrega" type="number" placeholder="7" />
                </div>
                <div>
                  <Label htmlFor="pedido-minimo">Pedido Mínimo (R$)</Label>
                  <Input id="pedido-minimo" type="number" step="0.01" placeholder="1000.00" />
                </div>
              </div>

              <div>
                <Label>Formas de Pagamento Aceitas *</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                  {['Boleto', 'PIX', 'Transferência', 'Cartão', 'Cheque', 'Dinheiro'].map((forma) => (
                    <label key={forma} className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm">{forma}</span>
                    </label>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="produtos">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Produtos Fornecidos
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Vincular Produto
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-center py-8">
                Nenhum produto vinculado ainda. Use o botão acima para vincular produtos que este fornecedor pode fornecer.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documentacao">
          <Card>
            <CardHeader>
              <CardTitle>Documentação</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  'CND Federal',
                  'CND Estadual', 
                  'CND Municipal',
                  'Certidão FGTS',
                  'Certidão Trabalhista',
                  'Contrato de Fornecimento',
                  'Tabela de Preços',
                  'Catálogo de Produtos'
                ].map((doc) => (
                  <div key={doc} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{doc}</span>
                      <Button size="sm" variant="outline">
                        <Upload className="h-4 w-4 mr-2" />
                        Upload
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">Nenhum arquivo enviado</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={() => setVisualizacao('lista')}>
          Cancelar
        </Button>
        <Button>
          Salvar Fornecedor
        </Button>
      </div>
    </div>
  )

  const renderDetalhes = () => {
    const fornecedor = fornecedores.find(f => f.id === fornecedorSelecionado)
    if (!fornecedor) return null

    return (
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => setVisualizacao('lista')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
          <div>
            <h2 className="text-2xl font-bold">{fornecedor.nomeFantasia}</h2>
            <p className="text-muted-foreground">{fornecedor.razaoSocial}</p>
          </div>
          <Badge 
            variant={
              fornecedor.classificacao.status === 'Ativo' ? 'default' :
              fornecedor.classificacao.status === 'Inativo' ? 'secondary' : 'destructive'
            }
          >
            {fornecedor.classificacao.status}
          </Badge>
        </div>

        <Tabs defaultValue="informacoes" className="space-y-6">
          <TabsList>
            <TabsTrigger value="informacoes">Informações</TabsTrigger>
            <TabsTrigger value="contatos">Contatos</TabsTrigger>
            <TabsTrigger value="historico">Histórico</TabsTrigger>
            <TabsTrigger value="avaliacao">Avaliação</TabsTrigger>
          </TabsList>

          <TabsContent value="informacoes">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Dados Cadastrais</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">CNPJ:</span>
                    <span>{fornecedor.cnpjCpf}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Inscrição Estadual:</span>
                    <span>{fornecedor.inscricaoEstadual || 'Não informado'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Categoria:</span>
                    <span>{fornecedor.classificacao.categoria}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Website:</span>
                    <span>{fornecedor.website || 'Não informado'}</span>
                  </div>
                  <Separator />
                  <div>
                    <span className="text-muted-foreground">Endereço:</span>
                    <p className="mt-1">{fornecedor.endereco}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Condições Comerciais</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Prazo de Pagamento:</span>
                    <span>{fornecedor.condicoesComerciais.prazoPagamento} dias</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Desconto:</span>
                    <span>{fornecedor.condicoesComerciais.desconto}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Frete:</span>
                    <span>{fornecedor.condicoesComerciais.frete}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Prazo de Entrega:</span>
                    <span>{fornecedor.condicoesComerciais.prazoEntrega} dias</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Pedido Mínimo:</span>
                    <span>R$ {fornecedor.condicoesComerciais.pedidoMinimo.toLocaleString('pt-BR')}</span>
                  </div>
                  <Separator />
                  <div>
                    <span className="text-muted-foreground">Formas de Pagamento:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {fornecedor.condicoesComerciais.formaPagamento.map((forma) => (
                        <Badge key={forma} variant="outline">{forma}</Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="contatos">
            <div className="grid gap-4">
              {fornecedor.contatos.map((contato) => (
                <Card key={contato.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <h4 className="font-medium">{contato.nome}</h4>
                        <p className="text-sm text-muted-foreground">{contato.cargo}</p>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="flex items-center gap-1">
                            <Phone className="h-4 w-4" />
                            {contato.telefone}
                          </span>
                          <span className="flex items-center gap-1">
                            <Mail className="h-4 w-4" />
                            {contato.email}
                          </span>
                          {contato.whatsapp && (
                            <span className="flex items-center gap-1">
                              <Phone className="h-4 w-4" />
                              WhatsApp: {contato.whatsapp}
                            </span>
                          )}
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="historico">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-green-600">
                      R$ {fornecedor.historico.valorTotalNegociado.toLocaleString('pt-BR')}
                    </div>
                    <p className="text-sm text-muted-foreground">Total Negociado</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {fornecedor.historico.comprasRealizadas.length}
                    </div>
                    <p className="text-sm text-muted-foreground">Compras Realizadas</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-orange-600">
                      {fornecedor.historico.pedidosAberto}
                    </div>
                    <p className="text-sm text-muted-foreground">Pedidos em Aberto</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-purple-600">
                      {fornecedor.historico.prazosCumpridos}%
                    </div>
                    <p className="text-sm text-muted-foreground">Prazos Cumpridos</p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Últimas Compras</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {fornecedor.historico.comprasRealizadas.map((compra) => (
                      <div key={compra.id} className="flex items-center justify-between p-3 border rounded">
                        <div>
                          <p className="font-medium">Compra #{compra.id}</p>
                          <p className="text-sm text-muted-foreground">
                            {compra.data.toLocaleDateString('pt-BR')} - {compra.produtos.join(', ')}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">R$ {compra.valor.toLocaleString('pt-BR')}</p>
                          <Badge variant="outline">{compra.status}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="avaliacao">
            <Card>
              <CardHeader>
                <CardTitle>Avaliação de Desempenho</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { label: 'Qualidade dos Produtos', valor: fornecedor.avaliacao.qualidadeProdutos },
                    { label: 'Pontualidade nas Entregas', valor: fornecedor.avaliacao.pontualidadeEntregas },
                    { label: 'Preço Competitivo', valor: fornecedor.avaliacao.precoCompetitivo },
                    { label: 'Atendimento', valor: fornecedor.avaliacao.atendimento }
                  ].map((item) => (
                    <div key={item.label} className="space-y-2">
                      <div className="flex justify-between">
                        <span>{item.label}</span>
                        <span className="font-medium">{item.valor.toFixed(1)}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${(item.valor / 5) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <Separator />

                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {fornecedor.avaliacao.notaGeral.toFixed(1)}
                  </div>
                  <div className="flex justify-center items-center gap-1 mb-2">
                    {renderStars(fornecedor.avaliacao.notaGeral)}
                  </div>
                  <p className="text-muted-foreground">Nota Geral</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={onVoltar}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar ao Dashboard
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Fornecedores</h1>
          <p className="text-muted-foreground">Gerencie seus fornecedores e parceiros comerciais</p>
        </div>
      </div>

      {visualizacao === 'lista' && renderLista()}
      {visualizacao === 'cadastro' && renderCadastro()}
      {visualizacao === 'detalhes' && renderDetalhes()}
    </div>
  )
}