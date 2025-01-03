import { Injectable } from '@angular/core';
import { CURRENCY_MASK } from '@shared/utils/constants';
import { isEmpty } from '@shared/utils/common';
type langs = 'pt-BR';
// {[key in langs]: {[x: string]: string | {[x: string]: string}}}
const translation = {
	'pt-BR': {
		app_name: 'HistoRique',
		app_names: 'Histo Rique',
		fixo: 'Fixo',
		celular: 'Celular',
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
		},
		success_messages: {
			record_saved_successfully: 'Registro salvo com sucesso!',
			record_deleted_successfully: 'Registro deletado com sucesso!',
			signin_success: 'Login efetuado com sucesso!',
			signup_success: 'Conta criada com sucesso!',
		},
		error_messages: {
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
				title: 'Início',
				add_indicator: 'Adicionar indicador',
				indicators: 'Indicadores'
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
				add: 'Adicionar plano',
				edit: 'Editar plano',
			},
			exams: {
				title: 'Exames',
				permissions: {
					add: 'Adicionar exame',
					edit: 'Editar exame',
					delete: 'Excluir exame',
					view: 'Visualizar exames',
				},
				form: {
					lab: 'Selecione o laboratório que foi realizado o exame',
					date: 'Qual a data da coleta do exame?',
					exam_date: 'Data do exame',
					results: {
						title: 'Resultados do exame',
						add: 'Adicionar resultado',
						edit: 'Editar resultado',
						delete: 'Excluir resultado',
						delete_confirmation: {
							title: 'Você está prestes a excluir este resultado',
							description: 'Deseja realmente continuar?' 
						},
						warning: {
							title: 'Você já adicionor um resultado para este tipo de exame',
							description: 'Deseja realmente continuar?' 
						}
					},
					no_results: 'Nenhum resultado foi inserido. Clique no botão acima (+) para adicionar.',
					exam_type: 'Selecione o tipo de exame',
					value: 'Resultado',
					material: 'Material utilizado',
					method: 'Método utilizado',
				}
			},
			labs: {
				lab: 'Laboratório',
				title: 'Laboratórios',
				permissions: {
					add: 'Adicionar exame',
					edit: 'Editar laboratório',
					delete: 'Excluir laboratório',
					view: 'Visualizar laboratórios',
				}
			},
			exam_types: {
				name_example: 'Colesterol LDL',
				unit: 'Unidade de medida',
				unit_example: 'mg/dl',
				title: 'Tipos de exames',
				list: 'Lista',
				method: 'Método',
				method_example: 'Exemplo: Enzimático',
				material: 'Material',
				material_example: 'Exemplo: Sangue',
				description_example: 'Exemplo: LDL calculado a partir da Fórmula de Martin.',
				no_group_found: 'Nenhum grupo foi inserido. Clique no botão acima (+) para adicionar.',
				groups: {
					title: 'Grupos de exames',
					name: 'Nome do grupo',
					delete: 'Excluir grupo',
					exam_types: 'Tipos de exames no grupo',
					delete_item: 'Excluir item',
					add_item: 'Adicionar item',
				},
				permissions: {
					add: 'Adicionar tipo de exame',
					edit: 'Editar tipo de exame',
					delete: 'Excluir tipo de exame',
					view: 'Visualizar tipos de exames',
				}
			},
			reference_values: {
				title: 'Valores de referência',
				permissions: {
					add: 'Adicionar valor de referência',
					edit: 'Editar valor de referência',
					delete: 'Excluir valor de referência',
					view: 'Visualizar valores de referência',
				},
				age_range: 'Faixa etária',
				values: 'Valor de referência',
				fasting: 'Com jejum',
				non_fasting: 'Sem jejum',	
				leave_non_fasting_empty: 'Deixe em branco se não houver diferença entre os valores com e sem jejum',
				category_example: 'Exemplo: Risco baixo, Risco alto, Deficiência, Toxicidade',
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
				title: 'Escolha seu plano abaixo',
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
