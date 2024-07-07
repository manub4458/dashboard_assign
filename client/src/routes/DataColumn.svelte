<script>
    export let data;
    export let index;
    export let page;
  </script>
  
  <tr class='text-center'>
    <td class="text-zinc-600 text-[15px] font-medium cursor-default">
      {((page - 1) * 10) + index + 1}
    </td>
    <td class="text-zinc-600 text-[15px] font-medium cursor-default">
      {data.country}
    </td>
    <td class="text-zinc-600 text-[15px] font-medium cursor-default">
      {data.topic}
    </td>
    <td class="text-zinc-600 text-[15px] font-medium cursor-default">
      {data.end_year}
    </td>
    <td class="text-zinc-600 text-[15px] font-medium cursor-default">
      {data.sector}
    </td>
    <td class="text-zinc-600 text-[15px] font-medium cursor-default">
      {data.pestle}
    </td>
    <td class="text-zinc-600 text-[15px] font-medium cursor-default">
      {data.source}
    </td>
    <td class="text-zinc-600 text-[15px] font-medium cursor-default">
      {data.region}
    </td>
  </tr>
  