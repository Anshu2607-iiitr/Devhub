import React, { useState } from 'react';
import { useAuction } from '../../context/AuctionContext';
import { formatCurrency } from '../../utils/currency';
import { ListOrdered, ArrowUp, ArrowDown, Play, Search, UserCheck } from 'lucide-react';

export default function PlayerQueueManager() {
  const { playerQueue, nextPlayer, reorderQueue } = useAuction();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredQueue = playerQueue.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="glass-panel rounded-3xl p-5 border border-slate-800 bg-slate-900/80">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <ListOrdered className="w-4 h-4 text-cyan-400" />
          <h3 className="font-bold text-sm text-slate-200 uppercase tracking-wider font-mono">
            Upcoming Queue ({playerQueue.length})
          </h3>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative mb-3">
        <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Filter upcoming queue..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
        />
      </div>

      {/* Queue List */}
      <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1 custom-scrollbar">
        {filteredQueue.length === 0 ? (
          <div className="text-center py-6 text-xs text-slate-500">
            No upcoming players found in queue.
          </div>
        ) : (
          filteredQueue.map((player, index) => (
            <div
              key={player.id}
              className="p-2.5 rounded-2xl bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 flex items-center justify-between gap-3 group transition-all"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="text-xs font-mono font-bold text-slate-500 w-4">
                  {index + 1}.
                </span>
                <img
                  src={player.image}
                  alt={player.name}
                  className="w-9 h-9 rounded-xl object-cover border border-slate-700 flex-shrink-0"
                />
                <div className="min-w-0">
                  <div className="text-xs font-bold text-white truncate">
                    {player.name}
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono flex items-center gap-1.5">
                    <span>{player.role}</span>
                    <span>•</span>
                    <span className="text-amber-400">{formatCurrency(player.basePrice, true)}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-1 flex-shrink-0">
                {/* Reorder Buttons */}
                <button
                  onClick={() => index > 0 && reorderQueue(index, index - 1)}
                  disabled={index === 0}
                  className="p-1 rounded-lg text-slate-500 hover:text-slate-200 disabled:opacity-30"
                  title="Move Up"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => index < playerQueue.length - 1 && reorderQueue(index, index + 1)}
                  disabled={index === playerQueue.length - 1}
                  className="p-1 rounded-lg text-slate-500 hover:text-slate-200 disabled:opacity-30"
                  title="Move Down"
                >
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>

                {/* Direct to Auction block */}
                <button
                  onClick={() => nextPlayer(player.id)}
                  className="px-2.5 py-1 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 font-bold text-[11px] font-mono border border-cyan-500/30 flex items-center gap-1 transition-all"
                  title="Put this player on live auction block immediately"
                >
                  <Play className="w-3 h-3 fill-current" />
                  <span>Call</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
}
