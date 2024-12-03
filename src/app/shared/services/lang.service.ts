import { Injectable } from '@angular/core';
import { CURRENCY_MASK } from '@shared/utils/constants';
import { isEmpty } from '@shared/utils/common';
type langs = 'pt-BR';
// {[key in langs]: {[x: string]: string | {[x: string]: string}}}
const translation = {
  'pt-BR': {
    'app_name': 'HistoRique',
    'app_names': 'Histo Rique',
    'fixo': 'Fixo',
    'celular': 'Celular',
    "calendar_inputs": {
      "firstDayOfWeek": 0,
      "dayNames": ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"],
      "dayNamesShort": ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"],
      "dayNamesMin": ["Do", "Se", "Te", "Qu", "Qu", "Se", "Sa"],
      "monthNames": [
        "Janeiro",
        "Fevereiro",
        "Março",
        "Abril",
        "Maio",
        "Junho",
        "Julho",
        "Agosto",
        "Setembro",
        "Outubro",
        "Novembro",
        "Dezembro"
      ],
      "monthNamesShort": ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
      "today": "Hoje",
      "clear": "Limpar"
    },
    'validation_error': {
      'required': 'Campo obrigatório',
      'invalid_email': 'Insira um email válido',
      'phone_invalid': 'Insira um número válido',
      'email': 'Insira um email válido',
      'passwords_must_match': 'As senhas inseridas devem ser iguais',
      'minlength': 'Insira no mínimo {{requiredLength}} caracteres',
      'mask': 'Formato inválido',
      'invalidDocument': 'Documento inválido',
    },
    'success_messages': {
      'error_occurred': 'Ocorreu um erro. Tente novamente.',
      'record_saved_successfully': 'Registro salvo com sucesso!',
      'record_deleted_successfully': 'Registro deletado com sucesso!',
      'signin_success': 'Login efetuado com sucesso!',
      'signup_success': 'Conta criada com sucesso!',
    },
    'error_messages': {
      'invalid_credentials': 'Usuário ou senha inválidos. Tente novamente.',
      'credentials_conflict': 'Email e/ou telefone já cadastrado. Tente novamente com outros dados.',
    },
    'signout': 'Sair',
    'signup_success_message': 'Clique no botão abaixo para continuar',
    'select_placeholder': 'Selecione...',
    'filter_placeholder': 'Pesquisar',
    'currency_placeholder': CURRENCY_MASK,
    'empty_placeholder': 'Nenhum registro encontrado.',
    'you_are_about_to_delete': 'Você está prestes a excluir este registro',
    'are_you_sure': 'Deseja realmente continuar?',

    // MODULES
    'home': 'Início',
    'account': 'Conta',
    'exams': 'Exames',
    'reports': 'Relatórios',

    //VERBS
    'close': 'Fechar',
    'confirm': 'Confirmar',
    'cancel': 'Cancelar',
    'edit': 'Editar',
    'delete': 'Excluir',
    'add': 'Adicionar',
    'view': 'Visualizar',
    'save': 'Salvar',
    'sign': "Assinar",

    'continue': 'Continuar',
    'dashboard': 'Dashboard',

    'users': 'Usuários',
    'add_user': 'Adicionar usuário',
    'edit_user': 'Editar usuário',

    'clients': 'Clientes',
    'tenants': 'Tenants',
    'configs': 'Configurações',
    'plans': 'Planos',
    'plan': 'Plano',
    'subscriptions': 'Assinaturas',

    'payment_date': 'Data de pagamento',
    'paid': 'Pago',
    'pending': 'Pendente',


    'prices': "Preços",
    'calendar': "Calendário",
    'name': 'Nome',
    'description': 'Descrição',
    'email': 'Email',
    'mobile_phone': 'Celular',
    'group': 'Grupo',
    'created_at': 'Criado em',
    'currency': 'Moeda',
    'amount': 'Valor',
    'recurrency': 'Recorrência',
    'featured': 'Destaque',
    'popular': 'Popular',
    'every': 'a cada',
    'plan_pricing': {
      interval: 'Intervalo',
      interval_count: 'Cobrar a cada',
      trial_period_days: 'Dias de teste',
      trial_period_days_info: 'Quantidades de dias que o cliente tem para testar o plano antes de ser cobrado',
    },
    'day': 'Dia',
    'days': 'Dias',
    'week': 'Semana',
    'weeks': 'Semanas',
    'month': 'Mês',
    'months': 'Meses',
    'year': 'Ano',
    'years': 'Anos',
    'total': 'Total',

    'status': 'Status',
    'active': 'Ativo',
    'inactive': 'Inativo',

    'state': 'Estado',
    'city': 'Cidade',
    'address': 'Endereço',
    'zipcode': 'CEP',
    'number': 'Número',
    'complement': 'Complemento',
    'neighborhood': 'Bairro',
    'country': 'País',
    'street': 'Rua',

    'password': 'Senha',
    'forgot_password': 'Esqueceu a senha?',
    'leave_blank_if_you_dont_want_to_change': 'Deixe em branco se não deseja alterar',
    'card_number': 'Número do cartão',
    'card_name': 'Nome no cartão',
    'card_expiration': 'Validade',
    'card_validation': 'CVV',
    'person_type': 'Tipo',
    'person_types': {
      'individual': 'Pessoa física',
      'corporation': 'Pessoa jurídica',
      'document_individual': 'CPF',
      'document_corporation': 'CNPJ',
    },
    'groups': {
      ADMIN: 'Administrador do sistema',
      TENANT_ADMIN: 'Administrador',
      USER: 'Usuário',
      CUSTOMER: 'Consumidor',
    },
    'payment_methods': {
      'PIX': 'PIX',
      'CARD': 'Cartão',
    },
    'pages': {
      'users': {
        'add': 'Adicionar usuário',
      },
      'plans': {
        'add': 'Adicionar plano',
        'edit': 'Editar plano',
      },
      'subscriptions': {
        'title': 'Escolha seu plano abaixo',
        'coupon': {
          'label': 'Possui um cupom de desconto?',
          'placeholder': 'Insira o cupom',
          'validate': 'Validar cupom'
        },
        'payment': {
          'title': 'Qual a forma de pagamento?',
        },
        'billing': {
          'title': 'Dados de cobrança',
          'name': 'Nome do comprador',
          'email': 'Email do comprador',
        },
        'tenant': {
          'current_subscription': 'Sua assinatura atual',
          'current_plan': 'Seu plano atual',
          'change_plan': 'Mudar de plano',
          'transactions': 'Transações'
        }
      },
    },
    'table': {
      'no_records_found': 'Nenhum registro encontrado',
      'currentPageReportTemplate': '{first} a {last} de {totalRecords} registros'
    }
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