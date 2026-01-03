interface EntryTypeSelectorProps {
  value: 'praise' | 'small_win' | 'learning';
  onChange: (type: 'praise' | 'small_win' | 'learning') => void;
}

export default function EntryTypeSelector({
  value,
  onChange,
}: EntryTypeSelectorProps) {
  const types = [
    {
      value: 'praise' as const,
      label: '칭찬받음',
      emoji: '👏',
      color: 'bg-blue-100 text-blue-700',
    },
    {
      value: 'small_win' as const,
      label: '작은 성과',
      emoji: '✨',
      color: 'bg-green-100 text-green-700',
    },
    {
      value: 'learning' as const,
      label: '배움',
      emoji: '📚',
      color: 'bg-purple-100 text-purple-700',
    },
  ];

  return (
    <div className="flex gap-2">
      {types.map((type) => (
        <button
          key={type.value}
          type="button"
          onClick={() => onChange(type.value)}
          className={`flex-1 px-4 py-3 rounded-lg border-2 transition-all ${
            value === type.value
              ? `${type.color} border-current`
              : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
          }`}
        >
          <div className="text-2xl mb-1">{type.emoji}</div>
          <div className="text-sm font-medium">{type.label}</div>
        </button>
      ))}
    </div>
  );
}
