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
  Building2, 
  MapPin, 
  CreditCard, 
  FileText, 
  Users, 
  Plus,
  Edit,
  Trash2,
  AlertTriangle,
  CheckCircle,
  Calendar
} from 'lucide-react'
import { Empresa, Endereco, ContaBancaria, DocumentoFiscal, RepresentanteLegal, Socio } from '@/lib/types'

interface CadastroEmpresaProps {
  onVoltar: () => void
}

export default function CadastroEmpresa({ onVoltar }: CadastroEmpresaProps) {
  const [empresa, setEmpresa] = useState<Partial<Empresa>>({
    razaoSocial: 'TECH SOLUTIONS LTDA',
    nomeFantasia: 'TechSol',
    cnpj: '12.345.678/0001-90',
    inscricaoEstadual: '123.456.789.012',
    inscricaoMunicipal: '12345678',
    cnaesPrincipal: '6201-5/00',
    cnaesSecundarios: ['6202-3/00', '6203-1/00'],
    regimeTributario: 'Simples Nacional',
    porte: 'ME'
  })

  const [enderecos] = useState<Endereco[]>([
    {
      id: '1',
      tipo: 'Matriz',
      cep: '01310-100',
      rua: 'Av. Paulista',
      numero: '1000',
      complemento: 'Sala 101',
      bairro: 'Bela Vista',
      cidade: 'São Paulo',
      estado: 'SP',
      telefones: ['(11) 3000-0000', '(11) 99999-9999'],
      emailCorporativo: 'contato@techsol.com.br',
      website: 'www.techsol.com.br'
    }
  ])

  const [contasBancarias] = useState<ContaBancaria[]>([
    {
      id: '1',
      banco: 'Banco do Brasil',
      agencia: '1234-5',
      conta: '12345-6',
      tipoConta: 'Corrente',
      chavePix: '12.345.678/0001-90',
      principal: true
    },
    {
      id: '2',
      banco: 'Caixa Econômica Federal',
      agencia: '0987',
      conta: '00123456-7',
      tipoConta: 'Corrente',
      chavePix: 'contato@techsol.com.br',
      principal: false
    }
  ])

  const [documentosFiscais] = useState<DocumentoFiscal[]>([
    {
      id: '1',
      tipo: 'CND Federal',
      dataEmissao: new Date('2024-01-15'),
      dataValidade: new Date('2024-07-15'),
      status: 'Válido'
    },
    {
      id: '2',
      tipo: 'CND Estadual',
      dataEmissao: new Date('2024-01-10'),
      dataValidade: new Date('2024-07-10'),
      status: 'Válido'
    },
    {
      id: '3',
      tipo: 'FGTS',
      dataEmissao: new Date('2023-12-01'),
      dataValidade: new Date('2024-02-15'),
      status: 'Vencendo'
    }
  ])

  const [representantes] = useState<RepresentanteLegal[]>([
    {
      id: '1',
      nome: 'João Silva Santos',
      cpf: '123.456.789-00',
      rg: '12.345.678-9',
      cargo: 'Diretor Geral',
      email: 'joao@techsol.com.br',
      telefone: '(11) 99999-8888',
      procuracoes: ['Procuração Geral']
    }
  ])

  const [socios] = useState<Socio[]>([
    {
      id: '1',
      nome: 'João Silva Santos',
      cpf: '123.456.789-00',
      participacao: 60,
      contatos: ['joao@techsol.com.br', '(11) 99999-8888']
    },
    {
      id: '2',
      nome: 'Maria Oliveira Costa',
      cpf: '987.654.321-00',
      participacao: 40,
      contatos: ['maria@techsol.com.br', '(11) 99999-7777']
    }
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Válido':
        return 'bg-green-100 text-green-800'
      case 'Vencendo':
        return 'bg-yellow-100 text-yellow-800'
      case 'Vencido':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Válido':
        return <CheckCircle className="h-4 w-4" />
      case 'Vencendo':
        return <AlertTriangle className="h-4 w-4" />
      case 'Vencido':
        return <AlertTriangle className="h-4 w-4" />
      default:
        return <Calendar className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Cadastro da Empresa</h2>
          <p className="text-muted-foreground">Gerencie os dados principais da sua empresa</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onVoltar}>
            Voltar
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Salvar Alterações
          </Button>
        </div>
      </div>

      <Tabs defaultValue="dados-principais" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="dados-principais">Dados Principais</TabsTrigger>
          <TabsTrigger value="enderecos">Endereços</TabsTrigger>
          <TabsTrigger value="bancarios">Dados Bancários</TabsTrigger>
          <TabsTrigger value="documentos">Documentação</TabsTrigger>
          <TabsTrigger value="representantes">Representantes</TabsTrigger>
          <TabsTrigger value="socios">Sócios</TabsTrigger>
        </TabsList>

        {/* Dados Principais */}
        <TabsContent value="dados-principais">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Informações Básicas
              </CardTitle>
              <CardDescription>
                Dados principais da empresa para identificação fiscal e comercial
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="razao-social">Razão Social *</Label>
                  <Input 
                    id="razao-social" 
                    value={empresa.razaoSocial || ''} 
                    onChange={(e) => setEmpresa({...empresa, razaoSocial: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nome-fantasia">Nome Fantasia</Label>
                  <Input 
                    id="nome-fantasia" 
                    value={empresa.nomeFantasia || ''} 
                    onChange={(e) => setEmpresa({...empresa, nomeFantasia: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cnpj">CNPJ *</Label>
                  <Input 
                    id="cnpj" 
                    value={empresa.cnpj || ''} 
                    onChange={(e) => setEmpresa({...empresa, cnpj: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ie">Inscrição Estadual</Label>
                  <Input 
                    id="ie" 
                    value={empresa.inscricaoEstadual || ''} 
                    onChange={(e) => setEmpresa({...empresa, inscricaoEstadual: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="im">Inscrição Municipal</Label>
                  <Input 
                    id="im" 
                    value={empresa.inscricaoMunicipal || ''} 
                    onChange={(e) => setEmpresa({...empresa, inscricaoMunicipal: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cnae-principal">CNAE Principal *</Label>
                  <Input 
                    id="cnae-principal" 
                    value={empresa.cnaesPrincipal || ''} 
                    onChange={(e) => setEmpresa({...empresa, cnaesPrincipal: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cnaes-secundarios">CNAEs Secundários</Label>
                  <Input 
                    id="cnaes-secundarios" 
                    value={empresa.cnaesSecundarios?.join(', ') || ''} 
                    placeholder="Separados por vírgula"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="regime-tributario">Regime Tributário *</Label>
                  <Select value={empresa.regimeTributario} onValueChange={(value: any) => setEmpresa({...empresa, regimeTributario: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o regime" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Simples Nacional">Simples Nacional</SelectItem>
                      <SelectItem value="Lucro Presumido">Lucro Presumido</SelectItem>
                      <SelectItem value="Lucro Real">Lucro Real</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="porte">Porte da Empresa *</Label>
                  <Select value={empresa.porte} onValueChange={(value: any) => setEmpresa({...empresa, porte: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o porte" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MEI">MEI</SelectItem>
                      <SelectItem value="ME">Microempresa (ME)</SelectItem>
                      <SelectItem value="EPP">Empresa de Pequeno Porte (EPP)</SelectItem>
                      <SelectItem value="Médio">Médio Porte</SelectItem>
                      <SelectItem value="Grande">Grande Porte</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Endereços */}
        <TabsContent value="enderecos">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Endereços
              </CardTitle>
              <CardDescription>
                Gerencie os endereços da matriz e filiais
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {enderecos.map((endereco) => (
                  <div key={endereco.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <Badge variant={endereco.tipo === 'Matriz' ? 'default' : 'secondary'}>
                        {endereco.tipo}
                      </Badge>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p><strong>Endereço:</strong> {endereco.rua}, {endereco.numero}</p>
                        <p><strong>Complemento:</strong> {endereco.complemento}</p>
                        <p><strong>Bairro:</strong> {endereco.bairro}</p>
                        <p><strong>Cidade/UF:</strong> {endereco.cidade}/{endereco.estado}</p>
                        <p><strong>CEP:</strong> {endereco.cep}</p>
                      </div>
                      <div>
                        <p><strong>Telefones:</strong> {endereco.telefones.join(', ')}</p>
                        <p><strong>Email:</strong> {endereco.emailCorporativo}</p>
                        {endereco.website && <p><strong>Website:</strong> {endereco.website}</p>}
                      </div>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Novo Endereço
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Dados Bancários */}
        <TabsContent value="bancarios">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Dados Bancários
              </CardTitle>
              <CardDescription>
                Contas bancárias para recebimentos e pagamentos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {contasBancarias.map((conta) => (
                  <div key={conta.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{conta.banco}</h4>
                        {conta.principal && (
                          <Badge variant="default">Principal</Badge>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <p><strong>Agência:</strong> {conta.agencia}</p>
                        <p><strong>Conta:</strong> {conta.conta}</p>
                      </div>
                      <div>
                        <p><strong>Tipo:</strong> {conta.tipoConta}</p>
                        {conta.chavePix && <p><strong>PIX:</strong> {conta.chavePix}</p>}
                      </div>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Nova Conta
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Documentação Fiscal */}
        <TabsContent value="documentos">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Documentação Fiscal
              </CardTitle>
              <CardDescription>
                Certidões e documentos necessários para licitações
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {documentosFiscais.map((doc) => (
                  <div key={doc.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <h4 className="font-medium">{doc.tipo}</h4>
                        <Badge className={getStatusColor(doc.status)}>
                          <span className="flex items-center gap-1">
                            {getStatusIcon(doc.status)}
                            {doc.status}
                          </span>
                        </Badge>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p><strong>Data Emissão:</strong> {doc.dataEmissao.toLocaleDateString('pt-BR')}</p>
                        <p><strong>Data Validade:</strong> {doc.dataValidade.toLocaleDateString('pt-BR')}</p>
                      </div>
                      <div>
                        <p><strong>Dias para vencer:</strong> {Math.ceil((doc.dataValidade.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} dias</p>
                      </div>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Novo Documento
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Representantes Legais */}
        <TabsContent value="representantes">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Representantes Legais
              </CardTitle>
              <CardDescription>
                Pessoas autorizadas a representar a empresa
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {representantes.map((rep) => (
                  <div key={rep.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium">{rep.nome}</h4>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p><strong>CPF:</strong> {rep.cpf}</p>
                        <p><strong>RG:</strong> {rep.rg}</p>
                        <p><strong>Cargo:</strong> {rep.cargo}</p>
                      </div>
                      <div>
                        <p><strong>Email:</strong> {rep.email}</p>
                        <p><strong>Telefone:</strong> {rep.telefone}</p>
                        <p><strong>Procurações:</strong> {rep.procuracoes.join(', ')}</p>
                      </div>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Representante
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Sócios */}
        <TabsContent value="socios">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Quadro Societário
              </CardTitle>
              <CardDescription>
                Sócios e participação societária
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {socios.map((socio) => (
                  <div key={socio.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <h4 className="font-medium">{socio.nome}</h4>
                        <Badge variant="outline">{socio.participacao}%</Badge>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p><strong>CPF:</strong> {socio.cpf}</p>
                        <p><strong>Participação:</strong> {socio.participacao}%</p>
                      </div>
                      <div>
                        <p><strong>Contatos:</strong> {socio.contatos.join(', ')}</p>
                      </div>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Sócio
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}