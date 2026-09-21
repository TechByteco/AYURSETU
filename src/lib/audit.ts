import { prisma } from './db';

export async function logAudit(params: {
  actorUserId: string;
  action: string;
  entityType: string;
  entityId: string;
  metadata?: Record<string, any>;
}) {
  try {
    await prisma.auditLog.create({
      data: {
        actorUserId: params.actorUserId,
        action: params.action,
        entityType: params.entityType,
        entityId: params.entityId,
        metadata: JSON.stringify(params.metadata || {}),
      },
    });
  } catch (error) {
    console.error('Audit log creation failed:', error);
  }
}
