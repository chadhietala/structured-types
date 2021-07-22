import { NextApiRequest, NextApiResponse } from 'next';
import reactPlugin from '@structured-types/api/react';

import { parseFiles, DocsOptions } from '@structured-types/api';
import { getHost } from '../../src/api/tsvfs-host';

export default async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  const { code, config, tsoptions } = req.query as {
    code?: string;
    config?: string;
    tsoptions?: string;
  };
  const options: DocsOptions = {
    plugins: [reactPlugin],
    ...(config ? JSON.parse(config) : undefined),
    tsOptions: tsoptions ? JSON.parse(tsoptions) : undefined,
  };

  const { lang = 'typescript' } = options?.tsOptions || {};
  const extension = lang === 'javascript' ? 'jsx' : 'tsx';
  const fileName = `index.${extension}`;
  const host = getHost(fileName, code || '');
  const result = parseFiles([fileName], options, host.compilerHost);
  res.status(200).json(result);
};