import { Injectable } from '@angular/core';
import { CALENDAR_DATE_FORMAT_BR, CALENDAR_DATETIME_FORMAT_BR, CURRENCY_MASK } from '@shared/utils/constants';
import { isEmpty } from '@shared/utils/common';
type langs = 'pt-BR';
// {[key in langs]: {[x: string]: string | {[x: string]: string}}}
const translation = {
	'pt-BR': {
		app_name: 'HistoRique',
		app_names: 'Histo Rique',
		fixo: 'Fixo',
		celular: 'Celular',
		monthly: 'Mensal',
		yearly: 'Anual',
		no_file_uploaded: 'Nenhum arquivo selecionado',
		calendar_inputs: {
			firstDayOfWeek: 0,
			dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
			dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
			dayNamesMin: ['Do', 'Se', 'Te', 'Qu', 'Qu', 'Se', 'Sa'],
			monthNames: [
				'Janeiro',
				'Fevereiro',
				'Março',
				'Abril',
				'Maio',
				'Junho',
				'Julho',
				'Agosto',
				'Setembro',
				'Outubro',
				'Novembro',
				'Dezembro',
			],
			monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
			today: 'Hoje',
			clear: 'Limpar',
		},
		delete_confirmation: {
			title: 'Você está prestes a deletar este registro',
			description: 'Esta ação não pode ser desfeita. Deseja realmente continuar?'
		},
		validation_error: {
			required: 'Campo obrigatório',
			invalid_email: 'Insira um email válido',
			phone_invalid: 'Insira um número válido',
			email: 'Insira um email válido',
			passwords_must_match: 'As senhas inseridas devem ser iguais',
			minlength: 'Insira no mínimo {{requiredLength}} caracteres',
			mask: 'Formato inválido',
			invalidDocument: 'Documento inválido',
			invalidUrl: 'URL inválida'
		},
		success_messages: {
			record_saved_successfully: 'Registro salvo com sucesso!',
			record_deleted_successfully: 'Registro deletado com sucesso!',
			signin_success: 'Login efetuado com sucesso!',
			signup_success: 'Conta criada com sucesso!',
			copied_to_clipboard: 'Copiado para a área de transferência',
			downloaded_successfully: 'Download concluído com sucesso',
		},
		error_messages: {
			file_format_not_allowed: 'Formato de arquivo não permitido',
			file_size_limit_exceeded: 'O arquivo selecionado excede o tamanho máximo permitido ({{size}}MB)',
			error_occurred: 'Ocorreu um erro. Tente novamente.',
			auth: {
				invalid_credentials: 'Usuário ou senha inválidos. Tente novamente.',
			},
			credentials_conflict: 'Email e/ou telefone já cadastrado. Tente novamente com outros dados.',
			user: {
				emailExists: 'Email já cadastrado. Tente novamente com outros dados.',
			},
			record_not_found: 'Registro não encontrado',
		},
		copy_to_clipboard: 'Copiar para a área de transferência',
		download_qrcode: 'Download do QRCode',
		signout: 'Sair',
		signup_success_message: 'Clique no botão abaixo para continuar',
		select_placeholder: 'Selecione...',
		filter_placeholder: 'Pesquisar',
		currency_placeholder: CURRENCY_MASK,
		empty_placeholder: 'Nenhum registro encontrado.',
		you_are_about_to_delete: 'Você está prestes a excluir este registro',
		are_you_sure: 'Deseja realmente continuar?',
		is_default: 'Padrão',
		//VERBS
		close: 'Fechar',
		confirm: 'Confirmar',
		cancel: 'Cancelar',
		edit: 'Editar',
		delete: 'Excluir',
		add: 'Adicionar',
		view: 'Visualizar',
		save: 'Salvar',
		sign: 'Assinar',

		continue: 'Continuar',
		dashboard: 'Dashboard',

		users: 'Usuários',
		add_user: 'Adicionar usuário',
		edit_user: 'Editar usuário',

		clients: 'Clientes',
		tenants: 'Tenants',
		configs: 'Configurações',
		plans: 'Planos',
		plan: 'Plano',
		subscriptions: 'Assinaturas',

		payment_date: 'Data de pagamento',
		paid: 'Pago',
		pending: 'Pendente',

		select: {
			placeholder: 'Selecione...',
			empty: 'Nenhum registro encontrado',
		},
		create_account: 'Criar conta',
		login: 'Entrar',
		prices: 'Preços',
		calendar: 'Calendário',
		name: 'Nome',
		birthDate: 'Data de nascimento',
		description: 'Descrição',
		unit: 'Unidade',
		email: 'Email',
		mobile_phone: 'Celular',
		group: 'Grupo',
		created_at: 'Criado em',
		updated_at: 'Última alteração',
		currency: 'Moeda',
		amount: 'Valor',
		recurrency: 'Recorrência',
		featured: 'Destaque',
		popular: 'Popular',
		every: 'a cada',
		plan_pricing: {
			interval: 'Intervalo',
			interval_count: 'Cobrar a cada',
			trial_period_days: 'Dias de teste',
			trial_period_days_info: 'Quantidades de dias que o cliente tem para testar o plano antes de ser cobrado',
		},
		date: 'Data',
		day: 'Dia',
		days: 'Dias',
		week: 'Semana',
		weeks: 'Semanas',
		month: 'Mês',
		months: 'Meses',
		year: 'Ano',
		years: 'Anos',
		total: 'Total',
		legend: 'Legenda',

		drag_to_reorder: 'Segure e arraste para reordenar',

		last_exam_at: 'Último exame em',
		last_exam_not_found: 'Último exame não cadastrado',

		min: 'Mínimo',
		max: 'Máximo',
		category: 'Categoria',

		last_24_hours: 'Últimas 24 horas',
		last_3_days: 'Últimos 3 dias',
		last_week: 'Última semana',
		last_month: 'Último mês',
		last_3_months: 'Últimos 3 meses',
		last_6_months: 'Últimos 6 meses',
		last_year: 'Último ano',
		all_time: 'Tudo',

		status: 'Status',
		active: 'Ativo',
		inactive: 'Inativo',

		state: 'Estado',
		city: 'Cidade',
		address: 'Endereço',
		zipcode: 'CEP',
		number: 'Número',
		complement: 'Complemento',
		neighborhood: 'Bairro',
		country: 'País',
		street: 'Rua',

		superiorThan: "Superior a",
		inferiorThan: "Inferior a",
		lessThan: "Menor que",
		greaterThan: "Maior que",
		to: 'a',

		not_informed: 'Não informado',
		free: 'Grátis',

		password: 'Senha',
		password_confirm: 'Confirmar senha',
		forgot_password: 'Esqueceu a senha?',
		show_password: 'Mostrar senha',
		hide_password: 'Ocultar senha',
		leave_blank_if_you_dont_want_to_change: 'Deixe em branco se não deseja alterar',
		card_number: 'Número do cartão',
		card_name: 'Nome no cartão',
		card_expiration: 'Validade',
		card_validation: 'CVV',
		person_type: 'Tipo',
		or: 'ou',
		person_types: {
			individual: 'Pessoa física',
			corporation: 'Pessoa jurídica',
			document_individual: 'CPF',
			document_corporation: 'CNPJ',
		},
		groups: {
			ADMIN: 'Administrador do sistema',
			TENANT_ADMIN: 'Administrador',
			USER: 'Usuário',
			CUSTOMER: 'Consumidor',
		},
		payment_methods: {
			PIX: 'PIX',
			CARD: 'Cartão',
		},
		pages: {
			dashboard: {
				title: 'Início'
			},
			links: {
				title: 'Links',
				visit_link: 'Visitar link',
				link_url: 'Compartilhe este link abaixo com seus contatos',
				link_qrcode: 'Faça o download do QRCode para compartilhar',
				permissions: {
					add: 'Adicionar link',
					edit: 'Editar link',
					delete: 'Excluir link',
					view: 'Visualizar links',
				},
				profile: {
					edit: 'Editar perfil',
					show: 'Exibir seção de perfil?',
					title: 'Nome',
					subtitle: 'Bio',
					phone: 'Whatsapp',
					phone2: 'Telefone',
					email: 'Email'
				},
				form: {
					no_records_found: 'Nenhum link adicionado. Clique no botão + para adicionar',
					configure_link: 'Configurar link',
					delete_link: 'Excluir link',
					item: {
						title: 'Título',
						title_info: 'Ex: (Link de agendamento)',
						url: 'URL',
						url_info: 'Ex: https://example.com',
						status_info: 'Links inativos não serão exibidos para o usuário'
					}
				},
				custom: {
					title: 'Customize seu tema',
					main_color: 'Cor principal',
					secondary_color: 'Cor secondária',
					font_color: 'Cor da fonte',
					apply_custom: 'Aplicar tema customizado',
				},
				tabs: {
					links: 'Links',
					appearance: 'Aparência',
					configs: 'Configurações'
				}
			},
			users: {
				title: 'Usuários',
				permissions: {
					add: 'Adicionar usuário',
					edit: 'Editar usuário',
					delete: 'Excluir usuário',
					view: 'Visualizar usuários',
				}
			},
			plans: {
				title: 'Planos',
				permissions: {
					add: 'Adicionar plano',
					edit: 'Editar plano',
					delete: 'Excluir plano',
					view: 'Visualizar planos',
				},
				form: {
					billing: {
						price: 'Valor do plano',
						price_info: 'Insira o valor 0,00 para planos gratuitos',
						frequency: 'Frequência de cobrança',
						trial_period_days: 'Dias de teste',
						trial_period_days_info: 'Quantidade de dias que o cliente tem para testar o plano antes de ser cobrado (Deixe vazio caso o teste não deva ser habilitado)',
					}
				}
			},

			saas: {
				title: 'SaaS',
			},
			home: {
				title: 'Início',
			},
			account: {
				title: 'Conta',
			},
			reports: {
				title: 'Relatórios',
			},
			roles: {
				title: 'Funções',
				permissions: {
					add: 'Adicionar função',
					edit: 'Editar função',
					delete: 'Excluir função',
					view: 'Visualizar funções',
				}
			},
			signout: {
				title: 'Sair',
			},
			signin: {
				title: 'Seja bem-vindo!',
				create: 'Criar conta',
				forgot_password: 'Esqueceu a senha?',
			},
			signup: {
				title: 'Criar uma conta',
				signin: 'Já possui uma conta?',
			},
			subscriptions: {
				title: 'Assinaturas',
				coupon: {
					label: 'Possui um cupom de desconto?',
					placeholder: 'Insira o cupom',
					validate: 'Validar cupom',
				},
				payment: {
					title: 'Qual a forma de pagamento?',
				},
				billing: {
					title: 'Dados de cobrança',
					name: 'Nome do comprador',
					email: 'Email do comprador',
				},
				tenant: {
					current_subscription: 'Sua assinatura atual',
					current_plan: 'Seu plano atual',
					change_plan: 'Mudar de plano',
					transactions: 'Transações',
				},
			},
		},
		table: {
			no_records_found: 'Nenhum registro encontrado',
			currentPageReportTemplate: '{first} a {last} de {totalRecords} registros',
		},
	},
};

export type Translated = (typeof translation)['pt-BR'];

@Injectable({
	providedIn: 'root',
})
export class LangService {
	lang: string;
	translation = translation['pt-BR'];

	constructor() {
		this.lang = 'pt-BR';
	}

	public getTranslation() {
		return this.translation;
	}

	public getLang(): string {
		return this.lang;
	}

	getMessage(path: string) {
		if (isEmpty(path) || typeof path !== 'string') return;
		const fields = path.split('.');
		const result = this.navigate(this.translation, fields);
		return result ?? path;
	}

	private navigate(obj: any, fields: string[]): string | any | null {
		const field = fields[0];
		if (!field) return null;
		if (typeof obj[field] === 'string') return obj[field];
		if (obj[field]) {
			return this.navigate(obj[field], fields.slice(1));
		}

		return null;
	}

	public getValueInLang(obj: object, key?: string, defaultIdxValue?: number) {
		if (key && Object.hasOwn(obj, key)) {
			return obj[key as keyof typeof obj];
		}
		if (!isEmpty(defaultIdxValue) && defaultIdxValue !== undefined) {
			return Object.values(obj)[defaultIdxValue];
		}
	}
}
