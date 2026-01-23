module Jekyll
  class RawContentTag < Liquid::Tag
    def initialize(tag_name, text, tokens)
      super
      @file = text.strip
    end

    def render(context)
      site_source = context.registers[:site].source
      File.read(File.join(site_source, @file))
    end
  end
end
