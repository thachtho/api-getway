export const KafkaClient = 'IMO-MICROSERVICE';
export const KafkaMessage = 'IMO-MESSAGE';

export enum KafkaEvent {
  AUTH_LOGIN = 'auth-login',
  HEALTH_CHECK = 'health_check',
}

export enum KafkaHealth {
  HEALTHY = 'healthy',
  UN_HEALTHY = 'unhealthy',
  WAITING = 'waiting',
}
