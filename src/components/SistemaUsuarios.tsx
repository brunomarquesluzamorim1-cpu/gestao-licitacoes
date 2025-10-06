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
  Users,
  Shield,
  Settings,
  Eye,
  EyeOff,
  Key,
  UserCheck,
  UserX,
  Clock,
  Activity,
  AlertTriangle,
  CheckCircle,
  Edit,
  Trash2,
  Upload,
  Download,
  RefreshCw
} from 'lucide-react'

interface SistemaUsuariosProps {
  onVoltar: () => void
}

interface Usuario {
  id: string
  nome: string
  cpf: string
  email: string
  telefone: string
  cargo: string
  departamento: string
  username: string
  perfil: string
  ativo: boolean
  ultimoLogin?: Date
  foto?: string
  forcarTrocaSenha: boolean
}

interface Perfil {
  id: string
  nome: string
  descricao: string
  permissoes: string[]
}

interface LogAuditoria {
  id: string
  usuario: string
  acao: string
  modulo: string
  registroAfetado?: string
  ip: string
  userAgent: string
  dataHora: Date
  dadosAntes?: string
  dadosDepois?: string
}

export default function SistemaUsuarios({ onVoltar }: SistemaUsuariosProps) {
  const [visualizacao, setVisualizacao] = useState<'usuarios' | 'perfis' | 'permissoes' | 'logs' | 'novo-usuario' | 'novo-perfil'>('usuarios')
  const [filtroStatus, setFiltroStatus] = useState<string>('todos')
  const [filtroPerfil, setFiltroPerfil] = useState<string>('todos')

  // Dados mockados para demonstração
  const usuarios: Usuario[] = [
    {
      id: '1',
      nome: 'João Silva',
      cpf: '123.456.789-00',
      email: 'joao.silva@empresa.com',
      telefone: '(11) 98765-4321',
      cargo: 'Gerente Comercial',
      departamento: 'Comercial',
      username: 'joao.silva',
      perfil: 'Gerente Comercial',
      ativo: true,
      ultimoLogin: new Date('2024-01-28T14:30:00'),
      forcarTrocaSenha: false
    },
    {
      id: '2',
      nome: 'Maria Santos',
      cpf: '987.654.321-00',
      email: 'maria.santos@empresa.com',
      telefone: '(11) 91234-5678',
      cargo: 'Contador',
      departamento: 'Financeiro',
      username: 'maria.santos',
      perfil: 'Contador',
      ativo: true,
      ultimoLogin: new Date('2024-01-28T09:15:00'),
      forcarTrocaSenha: false
    },
    {
      id: '3',
      nome: 'Pedro Oliveira',
      cpf: '456.789.123-00',
      email: 'pedro.oliveira@empresa.com',
      telefone: '(11) 95555-1234',
      cargo: 'Estoquista',
      departamento: 'Operacional',
      username: 'pedro.oliveira',
      perfil: 'Estoquista',
      ativo: false,
      ultimoLogin: new Date('2024-01-25T16:45:00'),
      forcarTrocaSenha: true
    }
  ]

  const perfis: Perfil[] = [
    {
      id: '1',
      nome: 'Administrador',
      descricao: 'Acesso total ao sistema',
      permissoes: ['*']
    },
    {
      id: '2',
      nome: 'Gerente Comercial',
      descricao: 'Licitações, vendas, produtos, fornecedores, documentos, relatórios operacionais',
      permissoes: [
        'licitacoes.visualizar',
        'licitacoes.criar',
        'licitacoes.enviar_propostas',
        'produtos.visualizar',
        'produtos.cadastrar',
        'produtos.editar',
        'fornecedores.visualizar',
        'fornecedores.cadastrar',
        'relatorios.operacionais'
      ]
    },
    {
      id: '3',
      nome: 'Contador',
      descricao: 'Financeiro, impostos, documentos fiscais, relatórios contábeis/fiscais',
      permissoes: [
        'financeiro.visualizar',
        'financeiro.lancar_movimentacoes',
        'financeiro.ver_lucros',
        'impostos.configurar',
        'documentos_fiscais.gerar',
        'relatorios.contabeis',
        'relatorios.fiscais'
      ]
    },
    {
      id: '4',
      nome: 'Estoquista',
      descricao: 'Produtos, estoque, entradas/saídas, recibos de entrega',
      permissoes: [
        'produtos.visualizar',
        'produtos.consultar_estoque',
        'produtos.ajustar_estoque',
        'estoque.entradas',
        'estoque.saidas',
        'documentos.recibos'
      ]
    },
    {
      id: '5',
      nome: 'Operacional',
      descricao: 'Consultas, entregas, atualização de status, recibos',
      permissoes: [
        'licitacoes.visualizar',
        'produtos.visualizar',
        'entregas.atualizar_status',
        'documentos.recibos'
      ]
    },
    {
      id: '6',
      nome: 'Visualizador',
      descricao: 'Apenas leitura sem edições',
      permissoes: [
        'licitacoes.visualizar',
        'produtos.visualizar',
        'fornecedores.visualizar',
        'financeiro.visualizar',
        'relatorios.visualizar'
      ]
    }
  ]

  const logs: LogAuditoria[] = [
    {
      id: '1',
      usuario: 'João Silva',
      acao: 'login',
      modulo: 'Sistema',
      ip: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      dataHora: new Date('2024-01-28T14:30:00')
    },
    {
      id: '2',
      usuario: 'Maria Santos',
      acao: 'criar',
      modulo: 'Produtos',
      registroAfetado: 'Produto #PRD-001',
      ip: '192.168.1.101',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      dataHora: new Date('2024-01-28T10:15:00'),
      dadosDepois: '{"nome":"Notebook Dell","preco":2500}'
    },
    {
      id: '3',
      usuario: 'João Silva',
      acao: 'editar',
      modulo: 'Licitações',
      registroAfetado: 'Licitação #LP-001/2024',
      ip: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      dataHora: new Date('2024-01-28T09:45:00'),
      dadosAntes: '{"status":"Aberta"}',
      dadosDepois: '{"status":"Em andamento"}'
    }
  ]

  const usuariosFiltrados = usuarios.filter(usuario => {
    const matchStatus = filtroStatus === 'todos' || 
                       (filtroStatus === 'ativo' && usuario.ativo) ||
                       (filtroStatus === 'inativo' && !usuario.ativo)
    const matchPerfil = filtroPerfil === 'todos' || usuario.perfil === filtroPerfil
    return matchStatus && matchPerfil
  })

  const renderUsuarios = () => (
    <div className="space-y-6">
      {/* Filtros */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex gap-2">
          <div className="relative flex-1 sm:w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input placeholder="Buscar usuários..." className="pl-10" />
          </div>
          <Select value={filtroStatus} onValueChange={setFiltroStatus}>
            <SelectTrigger className="w-32">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="ativo">Ativos</SelectItem>
              <SelectItem value="inativo">Inativos</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filtroPerfil} onValueChange={setFiltroPerfil}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Perfil" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos</SelectItem>
              {perfis.map((perfil) => (
                <SelectItem key={perfil.id} value={perfil.nome}>{perfil.nome}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button onClick={() => setVisualizacao('novo-usuario')}>
          <Plus className="h-4 w-4 mr-2" />
          Novo Usuário
        </Button>
      </div>

      {/* Lista de Usuários */}
      <div className="space-y-4">
        {usuariosFiltrados.map((usuario) => (
          <Card key={usuario.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                    <Users className="h-6 w-6 text-gray-600" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{usuario.nome}</h3>
                      <Badge variant={usuario.ativo ? 'default' : 'secondary'}>
                        {usuario.ativo ? 'Ativo' : 'Inativo'}
                      </Badge>
                      {usuario.forcarTrocaSenha && (
                        <Badge variant="outline" className="text-orange-600">
                          Trocar Senha
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {usuario.cargo} • {usuario.departamento}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>{usuario.email}</span>
                      <span>{usuario.telefone}</span>
                      <span>Perfil: {usuario.perfil}</span>
                    </div>
                    {usuario.ultimoLogin && (
                      <p className="text-xs text-muted-foreground">
                        Último login: {usuario.ultimoLogin.toLocaleString('pt-BR')}
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Key className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className={usuario.ativo ? 'text-red-600' : 'text-green-600'}
                  >
                    {usuario.ativo ? <UserX className="h-4 w-4" /> : <UserCheck className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )

  const renderPerfis = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Perfis de Acesso</h2>
        <Button onClick={() => setVisualizacao('novo-perfil')}>
          <Plus className="h-4 w-4 mr-2" />
          Novo Perfil
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {perfis.map((perfil) => (
          <Card key={perfil.id}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                {perfil.nome}
              </CardTitle>
              <CardDescription>{perfil.descricao}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium mb-2">Permissões:</p>
                  <div className="space-y-1">
                    {perfil.permissoes.slice(0, 3).map((permissao) => (
                      <div key={permissao} className="text-xs text-muted-foreground">
                        • {permissao === '*' ? 'Acesso total' : permissao.replace('.', ' → ')}
                      </div>
                    ))}
                    {perfil.permissoes.length > 3 && (
                      <div className="text-xs text-muted-foreground">
                        ... e mais {perfil.permissoes.length - 3} permissões
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex justify-between items-center pt-2">
                  <span className="text-sm text-muted-foreground">
                    {usuarios.filter(u => u.perfil === perfil.nome).length} usuários
                  </span>
                  <div className="flex gap-1">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )

  const renderPermissoes = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Matriz de Permissões</h2>

      <Card>
        <CardHeader>
          <CardTitle>Permissões por Módulo</CardTitle>
          <CardDescription>Configure permissões granulares para cada módulo do sistema</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {[
              {
                modulo: 'Produtos',
                permissoes: [
                  'visualizar', 'cadastrar', 'editar', 'excluir', 'consultar estoque', 
                  'ajustar estoque', 'ver preços de custo', 'alterar preços de venda', 
                  'registrar cotações', 'aprovar cotações'
                ]
              },
              {
                modulo: 'Licitações',
                permissoes: [
                  'visualizar', 'criar', 'enviar propostas', 'anexar documentos', 
                  'aprovar', 'cancelar', 'registrar emendas', 'atualizar status'
                ]
              },
              {
                modulo: 'Fornecedores',
                permissoes: [
                  'visualizar', 'cadastrar', 'editar', 'excluir', 'ver histórico', 'bloquear'
                ]
              },
              {
                modulo: 'Financeiro',
                permissoes: [
                  'visualizar entradas/saídas', 'lançar movimentações', 'ver lucros', 
                  'exportar relatórios', 'configurar impostos'
                ]
              },
              {
                modulo: 'Documentos Fiscais',
                permissoes: [
                  'gerar recibo/empenho/nota fiscal', 'cancelar', 'exportar PDF/Excel', 'enviar email'
                ]
              },
              {
                modulo: 'Usuários',
                permissoes: [
                  'visualizar', 'cadastrar', 'editar permissões', 'desativar', 'ver logs', 'redefinir senhas'
                ]
              },
              {
                modulo: 'Relatórios',
                permissoes: [
                  'operacionais', 'gerenciais', 'contábeis', 'dashboards'
                ]
              }
            ].map((item) => (
              <div key={item.modulo} className="space-y-3">
                <h4 className="font-semibold text-lg">{item.modulo}</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                  {item.permissoes.map((permissao) => (
                    <label key={permissao} className="flex items-center space-x-2 text-sm">
                      <input type="checkbox" className="rounded" />
                      <span>{permissao}</span>
                    </label>
                  ))}
                </div>
                <Separator />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderLogs = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Logs de Auditoria</h2>
        <div className="flex gap-2">
          <Select defaultValue="hoje">
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="hoje">Hoje</SelectItem>
              <SelectItem value="semana">Última semana</SelectItem>
              <SelectItem value="mes">Último mês</SelectItem>
              <SelectItem value="trimestre">Último trimestre</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Atividades Recentes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {logs.map((log) => (
              <div key={log.id} className="flex items-center gap-4 p-4 border rounded-lg">
                <div className={`p-2 rounded-full ${
                  log.acao === 'login' ? 'bg-green-100 text-green-600' :
                  log.acao === 'criar' ? 'bg-blue-100 text-blue-600' :
                  log.acao === 'editar' ? 'bg-yellow-100 text-yellow-600' :
                  log.acao === 'excluir' ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'
                }`}>
                  {log.acao === 'login' && <Activity className="h-4 w-4" />}
                  {log.acao === 'criar' && <Plus className="h-4 w-4" />}
                  {log.acao === 'editar' && <Edit className="h-4 w-4" />}
                  {log.acao === 'excluir' && <Trash2 className="h-4 w-4" />}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{log.usuario}</span>
                    <Badge variant="outline">{log.acao}</Badge>
                    <span className="text-sm text-muted-foreground">{log.modulo}</span>
                  </div>
                  {log.registroAfetado && (
                    <p className="text-sm text-muted-foreground">{log.registroAfetado}</p>
                  )}
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                    <span>{log.dataHora.toLocaleString('pt-BR')}</span>
                    <span>IP: {log.ip}</span>
                  </div>
                </div>
                
                {(log.dadosAntes || log.dadosDepois) && (
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderNovoUsuario = () => (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={() => setVisualizacao('usuarios')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar
        </Button>
        <h2 className="text-2xl font-bold">Novo Usuário</h2>
      </div>

      <Tabs defaultValue="dados-pessoais" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="dados-pessoais">Dados Pessoais</TabsTrigger>
          <TabsTrigger value="acesso">Acesso</TabsTrigger>
          <TabsTrigger value="permissoes">Permissões</TabsTrigger>
        </TabsList>

        <TabsContent value="dados-pessoais">
          <Card>
            <CardHeader>
              <CardTitle>Informações Pessoais</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="nome-completo">Nome Completo *</Label>
                  <Input id="nome-completo" placeholder="Nome completo do usuário" />
                </div>
                <div>
                  <Label htmlFor="cpf">CPF *</Label>
                  <Input id="cpf" placeholder="000.000.000-00" />
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input id="email" type="email" placeholder="usuario@empresa.com" />
                </div>
                <div>
                  <Label htmlFor="telefone">Telefone *</Label>
                  <Input id="telefone" placeholder="(00) 00000-0000" />
                </div>
                <div>
                  <Label htmlFor="cargo">Cargo *</Label>
                  <Input id="cargo" placeholder="Cargo do usuário" />
                </div>
                <div>
                  <Label htmlFor="departamento">Departamento *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o departamento" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="administrativo">Administrativo</SelectItem>
                      <SelectItem value="comercial">Comercial</SelectItem>
                      <SelectItem value="financeiro">Financeiro</SelectItem>
                      <SelectItem value="operacional">Operacional</SelectItem>
                      <SelectItem value="ti">TI</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="foto">Foto do Usuário</Label>
                <div className="flex items-center gap-4 mt-2">
                  <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
                    <Users className="h-8 w-8 text-gray-600" />
                  </div>
                  <Button variant="outline">
                    <Upload className="h-4 w-4 mr-2" />
                    Enviar Foto
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="acesso">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Acesso</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="username">Nome de Usuário *</Label>
                  <Input id="username" placeholder="nome.usuario" />
                </div>
                <div>
                  <Label htmlFor="senha">Senha *</Label>
                  <div className="flex gap-2">
                    <Input id="senha" type="password" placeholder="Digite a senha" />
                    <Button variant="outline" type="button">
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div>
                  <Label htmlFor="confirmar-senha">Confirmar Senha *</Label>
                  <Input id="confirmar-senha" type="password" placeholder="Confirme a senha" />
                </div>
                <div>
                  <Label htmlFor="status-usuario">Status *</Label>
                  <Select defaultValue="ativo">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ativo">Ativo</SelectItem>
                      <SelectItem value="inativo">Inativo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-3">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" />
                  <span>Forçar troca de senha no primeiro login</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" />
                  <span>Enviar credenciais por email</span>
                </label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="permissoes">
          <Card>
            <CardHeader>
              <CardTitle>Perfil e Permissões</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="perfil-usuario">Perfil Pré-configurado</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um perfil" />
                  </SelectTrigger>
                  <SelectContent>
                    {perfis.map((perfil) => (
                      <SelectItem key={perfil.id} value={perfil.id}>
                        {perfil.nome} - {perfil.descricao}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-2">
                <Separator className="flex-1" />
                <span className="text-sm text-muted-foreground">OU</span>
                <Separator className="flex-1" />
              </div>

              <div>
                <Button variant="outline">
                  <Settings className="h-4 w-4 mr-2" />
                  Personalizar Permissões
                </Button>
                <p className="text-sm text-muted-foreground mt-2">
                  Configure permissões específicas para este usuário
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={() => setVisualizacao('usuarios')}>
          Cancelar
        </Button>
        <Button>
          Salvar Usuário
        </Button>
      </div>
    </div>
  )

  const renderNovoPerfil = () => (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={() => setVisualizacao('perfis')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar
        </Button>
        <h2 className="text-2xl font-bold">Novo Perfil de Acesso</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informações do Perfil</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="nome-perfil">Nome do Perfil *</Label>
              <Input id="nome-perfil" placeholder="Nome do perfil" />
            </div>
            <div>
              <Label htmlFor="status-perfil">Status *</Label>
              <Select defaultValue="ativo">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ativo">Ativo</SelectItem>
                  <SelectItem value="inativo">Inativo</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="descricao-perfil">Descrição *</Label>
            <Textarea 
              id="descricao-perfil" 
              placeholder="Descrição detalhada do perfil e suas responsabilidades..."
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Configuração de Permissões</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {[
              {
                modulo: 'Produtos',
                permissoes: [
                  'visualizar', 'cadastrar', 'editar', 'excluir', 'consultar estoque', 
                  'ajustar estoque', 'ver preços de custo', 'alterar preços de venda'
                ]
              },
              {
                modulo: 'Licitações',
                permissoes: [
                  'visualizar', 'criar', 'enviar propostas', 'anexar documentos', 
                  'aprovar', 'cancelar', 'registrar emendas'
                ]
              },
              {
                modulo: 'Fornecedores',
                permissoes: [
                  'visualizar', 'cadastrar', 'editar', 'excluir', 'ver histórico', 'bloquear'
                ]
              },
              {
                modulo: 'Financeiro',
                permissoes: [
                  'visualizar entradas/saídas', 'lançar movimentações', 'ver lucros', 
                  'exportar relatórios'
                ]
              }
            ].map((item) => (
              <div key={item.modulo} className="space-y-3">
                <div className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" />
                  <h4 className="font-semibold">{item.modulo}</h4>
                </div>
                <div className="pl-6 grid grid-cols-2 md:grid-cols-3 gap-2">
                  {item.permissoes.map((permissao) => (
                    <label key={permissao} className="flex items-center space-x-2 text-sm">
                      <input type="checkbox" className="rounded" />
                      <span>{permissao}</span>
                    </label>
                  ))}
                </div>
                <Separator />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={() => setVisualizacao('perfis')}>
          Cancelar
        </Button>
        <Button>
          Salvar Perfil
        </Button>
      </div>
    </div>
  )

  const renderModulo = () => {
    switch (visualizacao) {
      case 'usuarios':
        return renderUsuarios()
      case 'perfis':
        return renderPerfis()
      case 'permissoes':
        return renderPermissoes()
      case 'logs':
        return renderLogs()
      case 'novo-usuario':
        return renderNovoUsuario()
      case 'novo-perfil':
        return renderNovoPerfil()
      default:
        return renderUsuarios()
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
          <h1 className="text-3xl font-bold">Sistema de Usuários</h1>
          <p className="text-muted-foreground">Gestão de usuários, perfis e permissões</p>
        </div>
      </div>

      {/* Navegação do módulo */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={visualizacao === 'usuarios' ? 'default' : 'outline'}
          onClick={() => setVisualizacao('usuarios')}
        >
          <Users className="h-4 w-4 mr-2" />
          Usuários
        </Button>
        <Button
          variant={visualizacao === 'perfis' ? 'default' : 'outline'}
          onClick={() => setVisualizacao('perfis')}
        >
          <Shield className="h-4 w-4 mr-2" />
          Perfis
        </Button>
        <Button
          variant={visualizacao === 'permissoes' ? 'default' : 'outline'}
          onClick={() => setVisualizacao('permissoes')}
        >
          <Settings className="h-4 w-4 mr-2" />
          Permissões
        </Button>
        <Button
          variant={visualizacao === 'logs' ? 'default' : 'outline'}
          onClick={() => setVisualizacao('logs')}
        >
          <Activity className="h-4 w-4 mr-2" />
          Logs de Auditoria
        </Button>
      </div>

      {renderModulo()}
    </div>
  )
}