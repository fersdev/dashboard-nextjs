interface StatsProps {
  statNumber: number;
  statText: string;
}

export function StatsComponent({ statNumber, statText }: StatsProps) {
  return (
    <>
      <dt className="mb-2 text-3xl md:text-4xl font-extrabold">{statNumber}</dt>
      <dd className="font-light text-gray-500 dark:text-gray-400">
        {statText}
      </dd>
    </>
  );
}
