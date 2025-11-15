import * as functions from 'firebase-functions';
import { getFirestore } from 'firebase-admin/firestore';
import { z } from 'zod';
import type { Tool } from '../../../packages/core/src/domain/creation/tool';
import { validateElementConfig } from '../../../packages/core/src/domain/creation/elements';

const CreateToolSchema = z.object({
  name: z.string().min(3, 'Tool name must be at least 3 characters long.'),
  description: z.string().optional(),
});

/**
 * A callable Cloud Function to create a new Tool document in Firestore.
 */
export const createTool = functions.https.onCall(async (data, context) => {
  // 1. Authentication Check
  if (!context.auth) {
    throw new functions.https.HttpsError(
      'unauthenticated',
      'The function must be called while authenticated.'
    );
  }

  // 2. Input Validation
  const validation = CreateToolSchema.safeParse(data);
  if (!validation.success) {
    throw new functions.https.HttpsError(
      'invalid-argument',
      `Invalid input: ${validation.error.message}`
    );
  }

  const { name, description } = validation.data;
  const ownerId = context.auth.uid;

  // 3. Construct the new Tool object
  const newTool: Omit<Tool, 'id'> = {
    name,
    description: description || '',
    ownerId,
    collaborators: [],
    version: '1.0.0',
    elements: [],
  };

  // 4. Firestore Write
  try {
    const db = getFirestore();
    const toolRef = await db.collection('tools').add(newTool);
    console.log(`Successfully created tool ${toolRef.id} for user ${ownerId}`);
    return { id: toolRef.id };
  } catch (error) {
    console.error('Error creating tool in Firestore:', error);
    throw new functions.https.HttpsError(
      'internal',
      'An unexpected error occurred while creating the tool.'
    );
  }
});

const ConfiguredElementSchema = z.object({
  instanceId: z.string(),
  elementId: z.string(),
  config: z.record(z.unknown()),
});

const UpdateToolSchema = z.object({
  toolId: z.string(),
  name: z.string().min(3).optional(),
  description: z.string().optional(),
  elements: z.array(ConfiguredElementSchema).optional(),
});

/**
 * A callable Cloud Function to update an existing Tool document.
 * This function performs an in-place update and increments the tool's version.
 */
export const updateTool = functions.https.onCall(async (data, context) => {
  // 1. Authentication Check
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'You must be logged in to update a tool.');
  }

  // 2. Input Validation
  const validation = UpdateToolSchema.safeParse(data);
  if (!validation.success) {
    throw new functions.https.HttpsError('invalid-argument', `Invalid input: ${validation.error.message}`);
  }

  const { toolId, ...updates } = validation.data;
  const uid = context.auth.uid;
  const db = getFirestore();
  const toolRef = db.collection('tools').doc(toolId);

  try {
    const doc = await toolRef.get();
    if (!doc.exists) {
      throw new functions.https.HttpsError('not-found', 'The specified tool does not exist.');
    }

    const tool = doc.data() as Tool;

    // 3. Authorization Check
    if (tool.ownerId !== uid && !tool.collaborators.includes(uid)) {
      throw new functions.https.HttpsError('permission-denied', 'You do not have permission to edit this tool.');
    }

    // 4. Element Config Validation
    if (updates.elements) {
      for (const element of updates.elements) {
        try {
          validateElementConfig(element.elementId, element.config);
        } catch (error: any) {
          throw new functions.https.HttpsError('invalid-argument', `Invalid element configuration: ${error.message}`);
        }
      }
    }

    // 5. Versioning Logic
    const [major, minor] = tool.version.split('.').map(Number);
    const newVersion = `${major}.${minor + 1}.0`;

    const updatedFields = {
      ...updates,
      version: newVersion,
    };

    // 6. Firestore Write
    await toolRef.update(updatedFields);

    console.log(`Successfully updated tool ${toolId} to version ${newVersion} by user ${uid}`);
    return { version: newVersion };
  } catch (error) {
    if (error instanceof functions.https.HttpsError) {
      throw error;
    }
    console.error(`Error updating tool ${toolId}:`, error);
    throw new functions.https.HttpsError('internal', 'An unexpected error occurred while updating the tool.');
  }
}); 
