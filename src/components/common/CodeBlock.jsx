import React, { useState } from 'react';
import { Copy, Check, Terminal, Play } from 'lucide-react';

export const CodeBlock = ({ code, language = 'java', filename, showLineNumbers = true, output, onRun }) => {
  const [copied, setCopied] = useState(false);
  const [showOutput, setShowOutput] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const highlightJava = (rawCode) => {
    const lines = rawCode.split('\n');

    return lines.map((line, i) => {
      if (line.trim().startsWith('//') || line.trim().startsWith('#')) {
        return <span key={i} className="text-slate-500 italic">{line}</span>;
      }

      const highlighted = line
        .replace(/\b(public|private|protected|class|interface|record|sealed|permits|static|final|void|int|double|float|long|boolean|char|byte|short|new|return|if|else|switch|case|default|for|while|do|break|continue|try|catch|finally|throw|throws|import|package|extends|implements|yield|when|var)\b/g, '<span class="text-purple-400 font-semibold">$1</span>')
        .replace(/\b(System|String|Math|Arrays|List|Set|Map|HashMap|HashSet|ArrayList|ExecutorService|Thread|LocalDate|DateTimeFormatter|PrintStream|Exception|RuntimeException|AutoCloseable|PreparedStatement|Connection|ResultSet|ChatClient|VectorStore|KafkaTemplate|FeignClient|SecurityFilterChain)\b/g, '<span class="text-cyan-400 font-medium">$1</span>')
        .replace(/(".*?"|'.*?')/g, '<span class="text-emerald-400">$1</span>')
        .replace(/(@[A-Za-z0-9_]+)/g, '<span class="text-amber-400">$1</span>')
        .replace(/\b(\d+(_\d+)*[Lfd]?)\b/g, '<span class="text-amber-300">$1</span>');

      return (
        <div key={i} className="table-row">
          {showLineNumbers && (
            <span className="table-cell select-none pr-4 text-right text-xs text-slate-600 font-mono">
              {i + 1}
            </span>
          )}
          <span
            className="table-cell whitespace-pre font-mono text-xs sm:text-sm text-slate-200"
            dangerouslySetInnerHTML={{ __html: highlighted }}
          />
        </div>
      );
    });
  };

  return (
    <div className="my-4 rounded-xl border border-white/10 bg-[#0B0F19] overflow-hidden shadow-xl">
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#0e1526] border-b border-white/5">
        <div className="flex items-center space-x-2.5">
          <div className="flex space-x-1.5">
            <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
          </div>
          {filename && (
            <div className="flex items-center space-x-1.5 ml-2 text-xs font-mono text-slate-400">
              <Terminal className="w-3.5 h-3.5 text-purple-400" />
              <span>{filename}</span>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-2">
          {output && (
            <button
              onClick={() => setShowOutput(!showOutput)}
              className="flex items-center space-x-1 text-xs px-2.5 py-1 rounded-md bg-purple-500/10 text-purple-300 hover:bg-purple-500/20 border border-purple-500/20 transition"
            >
              <Play className="w-3 h-3" />
              <span>{showOutput ? 'Hide Output' : 'Run Demo'}</span>
            </button>
          )}
          <button
            onClick={handleCopy}
            className="flex items-center space-x-1 text-xs px-2 py-1 rounded-md text-slate-400 hover:text-slate-200 hover:bg-white/5 transition"
            title="Copy code"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 text-[11px]">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span className="text-[11px]">Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      <div className="p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed">
        <div className="table w-full">{highlightJava(code)}</div>
      </div>

      {(showOutput || onRun) && output && (
        <div className="border-t border-white/10 bg-[#080B12] p-3.5 text-xs font-mono">
          <div className="flex items-center space-x-2 text-slate-500 mb-1.5">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="uppercase tracking-wider text-[10px] font-semibold text-slate-400">Terminal Output</span>
          </div>
          <pre className="text-emerald-300 whitespace-pre-wrap pl-3 border-l-2 border-emerald-500/40">
            {output}
          </pre>
        </div>
      )}
    </div>
  );
};
