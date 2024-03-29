'use client';

import React, { useState } from 'react';
import { cn } from '@/utils/classname';
import AddName from './components/AddName';
import AddValue from './components/AddValue';
import { Divider } from '@nextui-org/react';
import { useWalletData } from '@/stores/walletData';

const CampaignAddPage = () => {
  const { address } = useWalletData();
  const [step, setStep] = useState<number>(0);
  const [data, setData] = useState<ICampaignCreate>({
    name: '',
    cost: '',
    totalSupply: 1,
    voucherOffchainData: {
      name: '',
      description: '',
      image:
        'https://bafkreib27rlnv43t4wvvuoy5fyrrs6isyuvtgc5r5cbdypzh63kwlfzpdu.ipfs.nftstorage.link/',
      cost: 1,
    },
  });

  if (!address || address.length === 0) return <div>Please connect wallet</div>;

  return (
    <div className="flex w-full flex-col gap-4">
      <div>
        <div className="text-4xl font-semibold">Create campaign</div>
        <div className="mt-2 text-sm">
          {step === 0
            ? 'Creating a campaign helps you better manage and adjust future campaigns'
            : 'Creating vouchers helps you reach customers better. You can create and add vouchers after completing campaign creation.'}
        </div>
      </div>

      <div className="w-full text-center text-sm font-medium text-gray-500 dark:text-gray-400">
        <ul className="flex flex-wrap gap-1">
          {[1, 2].map((tab, index) => (
            <li
              key={`tadd-${index}`}
              className={cn(
                'inline-block flex-grow border-b-4 pb-2',
                step > index
                  ? 'border-gray-900 text-gray-900 dark:border-gray-900 dark:text-gray-900'
                  : '',
                step === index
                  ? 'active border-primary-500 text-primary-500 dark:border-primary-500 dark:text-primary-500'
                  : '',
                step < index
                  ? 'border-gray-200 text-gray-500 dark:border-gray-200 dark:text-gray-500'
                  : ''
              )}
            />
          ))}
        </ul>
      </div>

      <Divider />

      <div>
        <div className={cn(step === 0 ? '' : 'hidden')}>
          <AddName next={() => setStep(1)} data={data} setData={setData} />
        </div>
        <div className={cn(step === 1 ? '' : 'hidden')}>
          <AddValue back={() => setStep(0)} data={data} setData={setData} />
        </div>
      </div>
    </div>
  );
};

export default CampaignAddPage;
